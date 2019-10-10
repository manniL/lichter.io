export default {
  props: {
    stripe: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    const stripeInstance = this.stripe

    return {
      loading: true,
      canMakePayment: false,
      elements: stripeInstance.elements({ locale: this.$root.locale }),
      paymentRequest: stripeInstance.paymentRequest(this.options.paymentRequest || {})
    }
  },
  computed: {
    buttonStyle () {
      return (this.options && this.options.style) || undefined
    }
  },
  mounted () {
    this.checkApiAvailability()
  },
  watch: {
    options () {
      this.updatePaymentRequest()
    }
  },
  methods: {
    async checkApiAvailability () {
      try {
        const canMakePayment = await this.paymentRequest.canMakePayment()
        this.init(canMakePayment)

        this.paymentRequest.on('paymentmethod', event => this.$emit('receivedPaymentMethod', event))
      } catch (_) {}
    },
    init (canMakePayment) {
      this.loading = false
      this.canMakePayment = canMakePayment
      this.$nextTick(this.createPaymentRequestButton)
    },
    createPaymentRequestButton () {
      if (!this.canMakePayment || !this.$refs.element) {
        this.$emit('available', false)
        return
      }

      this.$emit('available', true)

      this.elements
        .create('paymentRequestButton', { paymentRequest: this.paymentRequest, style: this.buttonStyle || {} })
        .mount(this.$refs.element)
    },
    updatePaymentRequest () {
      if (!this.paymentRequest) {
        return
      }
      const { total } = this.options.paymentRequest
      this.paymentRequest.update({ total })
    }
  },
  render (createElement) {
    // Render a loading slot if we are waiting for canMakePayment.
    if (this.loading) {
      return this.$slots.loading && this.$slots.loading[0]
    }

    // Render a warning slot if payment request isn't available.
    if (!this.canMakePayment) {
      return this.$slots.unavailable && this.$slots.unavailable[0]
    }

    // Render scoped slot if provided.
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({
        listeners: { click: event => this.paymentRequest.show() },
        canMakePayment: this.canMakePayment
      })
    }

    // Otherwise render default Stripe Element button.
    return createElement('div', { ref: 'element' })
  }
}
