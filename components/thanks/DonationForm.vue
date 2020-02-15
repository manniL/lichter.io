<template>
  <form id="donationform" class="flex flex-col" @submit.prevent="handleCreditCardPayment">
    <h2 class="text-center text-3xl md:text-4xl mt-8 pt-10">
      Please enter your credit card details
    </h2>
    <p class="pt-2 text-gray-700">
      Don't worry. Payments are processed through Stripe
    </p>

    <label class="text-md md:text-xl pt-12 py-4 flex flex-col md:flex-row justify-between items-center">
      <span class="font-bold">
        Donation Amount (in Euro):
      </span>
      <input
        v-model="amount"
        class="appearance-none text-right px-3 py-2 shadow-inner border border-gray-400"
        lang="en-150"
        max="10000.00"
        min="0.50"
        placeholder="13.37"
        step="0.01"
        type="number"
      >
    </label>
    <label ref="email" class="text-lg md:text-xl py-4 flex flex-col md:flex-row justify-between items-center">
      <span class="font-bold">
        Your e-mail (optional):
      </span>
      <input
        v-model="email"
        class="appearance-none text-right px-3 py-2 shadow-inner border border-gray-400"
        placeholder="you@areaweso.me"
        type="email"
      >
    </label>
    <label class="text-md md:text-xl py-4 flex flex-col md:flex-row justify-between items-center">
      <span class="font-bold">
        Leave me a message (optional):
      </span>
      <input
        v-model="message"
        class="appearance-none text-right px-3 py-2 shadow-inner border border-gray-400"
        placeholder="<3"
      >
    </label>

    <ClientOnly>
      <PaymentButton
        v-if="canRenderPaymentButton"
        class="mt-8"
        :stripe="stripeInstance"
        :options="paymentButtonOptions"
        @available="setPaymentButtonAvailability"
        @receivedPaymentMethod="handlePaymentButtonPayment"
      />
      <span v-if="isPaymentButtonAvailable && canRenderPaymentButton" class="text-gray-700 py-4">
        or enter your credit card info below
      </span>
    </ClientOnly>

    <span class="text-md md:hidden mt-8 font-bold">
      Credit Card Info
    </span>
    <Card
      :class="{ 'border-green-600': complete }"
      :stripe="$options.stripeKey"
      class="rounded px-4 py-2 border border-gray-400 mt-2 bg-white shadow-inner text-gray-800"
      @change="complete = $event.complete"
    />
    <p v-if="error" class="text-lg text-red-500 my-5" v-text="error" />

    <button class="bg-green-500 hover:bg-green-400 w-full py-2 text-white text-lg w-auto mx-auto shadow-lg border border-green-400 mt-8">
      <span v-if="!loading">
        Donate {{ isPaymentButtonAvailable ? 'via credit card' : '' }} ❤️
      </span>
      <span v-else class="cp-spinner cp-meter h-16 w-16" />
    </button>
  </form>
</template>

<script>
import { Card, handleCardPayment, instance } from 'vue-stripe-elements-plus'
import PaymentButton from '@/components/thanks/PaymentButton'

export default {
  components: {
    PaymentButton,
    Card
  },
  props: {
    donationType: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      complete: false,
      message: '',
      amount: undefined,
      loading: false,
      error: false,
      invalid: [],
      email: '',
      stripeInstance: null,
      isPaymentButtonAvailable: false
    }
  },
  computed: {
    amountInCents () {
      return Number(this.amount).toFixed(2) * 100
    },
    canRenderPaymentButton () {
      if (!this.stripeInstance) {
        return false
      }

      if (!this.amountInCents) {
        return false
      }

      return true
    },
    paymentButtonOptions () {
      return {
        paymentRequest: {
          country: 'DE',
          currency: 'eur',
          total: {
            label: 'Donation to Alexander Lichter',
            amount: this.amountInCents
          }
        },
        style: {
          paymentRequestButton: {
            type: 'donate'
          }
        }
      }
    }
  },
  watch: {
    donationType (type) {
      if (!type) {
        return
      }

      if (type.price === -1) {
        this.amount = undefined
        return
      }

      this.amount = Number(type.price / 100).toFixed(2)
      setTimeout(() => this.$refs.email.focus(), 250)
    }
  },
  mounted () {
    this.stripeInstance = instance
  },
  methods: {
    resetFormData () {
      this.resetFormState()
      this.amount = undefined
      this.email = ''
      this.message = ''
    },
    resetFormState () {
      this.loading = false
      this.error = false
      this.invalid = []
    },
    handleCreditCardPayment () {
      const isFormValid = this.validateForm()
      if (!isFormValid) {
        return
      }

      this.chargeCreditCard()
    },
    async handlePaymentButtonPayment ({ complete, paymentMethod }) {
      this.loading = true
      const { secret } = await this.createIntent()
      try {
        const { error: confirmError } = await instance.confirmPaymentIntent(secret, {
          payment_method: paymentMethod.id
        })

        if (confirmError) {
          complete('fail')
          this.handleError(confirmError.message)
          return
        }

        complete('success')
        this.handleCardPayment(secret, true)
      } catch (e) {
        this.handleError(e.message)
      }
    },
    validateForm () {
      if (this.loading) {
        return false
      }

      this.resetFormState()

      const isNumberInvalid = !this.amount || Number.isNaN(this.amount)

      if (isNumberInvalid) {
        this.invalid.push(['amount'])
      }

      const { amountInCents: amount } = this

      if (this.invalid.length) {
        this.error = 'The form is not filled correctly. The amount is set wrong.'
        return
      }

      if (amount < 50) {
        this.error = 'Stripe does not accept payments lower than 50 cents'
        return
      }

      if (!this.complete) {
        this.error = 'Your Credit Card details are not correct'
        return
      }

      return true
    },
    async chargeCreditCard () {
      this.loading = true

      try {
        const { secret } = await this.createIntent()
        this.handleCardPayment(secret)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        this.handleError('Could not create intent')
      }
    },
    createIntent () {
      const { email, message, amountInCents: amount } = this

      return this.$axios.$post('register-intent', {
        amount,
        donationType: this.donationType.slug,
        email,
        message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    async handleCardPayment (secret, useFreshInstance = false) {
      const handleFn = useFreshInstance ? instance.handleCardPayment : handleCardPayment
      const [{ error }, { Confetti }] = await Promise.all([handleFn(secret), import('vue-confetti')])

      if (error) {
        this.handleError((error && error.message) || error)
        return
      }

      this.loading = false

      this.resetFormData()
      this.$emit('completed')
      const confetti = new Confetti()
      confetti.start({})
      setTimeout(() => confetti.stop(), 5000)
    },
    handleError (errorMessage) {
      this.error = errorMessage
      this.loading = false
    },
    setPaymentButtonAvailability (isAvailable) {
      this.isPaymentButtonAvailable = isAvailable
    }
  },
  stripeKey: process.env.stripePublicKey
}
</script>

<style>
  .cp-spinner {
    display: inline-block;
    box-sizing: border-box;
    position: relative
  }

  .cp-meter {
    border-radius: 50%;
    border: 3px solid white;
    width: 32px;
    height: 32px;
    display: inline-block;
    box-sizing: border-box
  }

  .cp-meter:before {
    border-radius: 1px;
    content: " ";
    width: 3px;
    height: 14px;
    display: inline-block;
    box-sizing: border-box;
    background-color: white;
    position: absolute;
    left: 12px;
    transform-origin: center bottom;
    animation: cp-meter-animate-before 1s linear infinite
  }

  @keyframes cp-meter-animate-before {
    0% {
      transform: rotate(-45deg)
    }
    100% {
      transform: rotate(315deg)
    }
  }
</style>
