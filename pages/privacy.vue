<template>
  <div class="container mx-auto px-4 my-8 min-h-screen bg-gray-100 prose">
    <h1>
      Privacy Policy
    </h1>
    <p>
      Hey you! First of all, thanks for your interest in my privacy policy.<br>
      I deeply care about the security of your data and will do my best to collect only the needed information and
      protect those!
    </p>

    <h2>
      Overview
    </h2>

    <h3>
      Who is responsible for the collection of data on Lichter.io?
    </h3>
    <p>
      That's me, or better said my company: Developmint GbR. Our contact data can be found in the
      <NuxtLink
        to="/legal/"
        rel="nofollow"
        v-text="'legal notice'"
      />.
    </p>

    <h3>
      How do we collect your data?
    </h3>
    <p>
      We collect data you provide us when you contact us (eg. through the contact form, e-mail, telephone or social
      media).<br>
      Furthermore we collect data anonymized through Google Analytics (see 3.). We do not collect any personal
      data.<br>
      Technical data (like the OS, screen size, language preference, browser) is collected automatically to improve your
      website experience.
    </p>

    <h3>
      How do we use your data?
    </h3>
    <p>
      We use statistics to further develop the Website, to recognize problems or errors and to find out what you, the
      user, like most.
    </p>

    <h3>
      What are your rights?
    </h3>
    <p>
      You have the right to request information about purpose, origin and recipients of your data at any given time and
      free of charge.<br>
      You can demand correction, locking or deletion of your data.<br>
      Also you can revoke given consents for processing data. <br>
      To file a request, simply send a mail to privacy@developmint.de.<br>
      But as we don't save any personal data through Lichter.io, we will likely tell you that we don't have any data
      about you.<br>
      <br>
      In case we don’t comply with your request, you have the right to complain at the responsible regulating authority.<br>
      Of course, it’s in our interest to guarantee your personal data privacy.<br>
      If you have any questions please feel free to contact us via privacy@developmint.de.<br>
    </p>

    <h3>
      Legal basis
    </h3>
    <p>
      The legal basis for privacy can be found in the GDPR (General Data Protection Regulation) and the Telemedia Act
      (Telemediengesetz, TMG).
    </p>

    <h2>
      2. Collection and Use of Personal Information
    </h2>

    <h3>
      Cookies
    </h3>
    <p>
      This Website uses cookies (as we already announced when you visited the page the first time).<br>
      Cookies are small pieces of information which are stored as file and placed on your device by a Website.<br>
      They do not harm your device and do not contain viruses or malware.<br>
      Cookies can be read by the Website on your subsequent visits.<br>
      Cookies will be deleted after a defined time. You can do this also manually in your browser<br>
      <br>
      We use Cookies to save your preferences (f.ex. which consents you gave) and to create statistics and evaluations
      concerning our Website usage so we can further optimize Lichter.io (see 3.).<br>
      This is allowed through the GDPR because we can prove legitimate interests.<br>
      The Cookies allow us to detect if you have visited the page before. This does not mean that we know your identity
      because of these Cookies.
    </p>

    <h3>
      Contacting us
    </h3>
    <p>
      When you contact us (f.ex. through a contact form, via e-mail, telephone or social media), we will use the data
      you provide us only to process that contact request. The data could be saved in a Customer-Relationship-Management
      system ("CRM") or similar organization system.<br>
      We delete the data as soon as they are not necessary anymore. We verify the necessity every year - furthermore,
      the legal archiving obligations apply.
      No data is transferred to third parties.<br>
      Nor is any of this information matched to any information that may be collected by other components of our
      website.
    </p>

    <h2>
      3. Analytics Tools
    </h2>

    <h3>
      Google Analytics
    </h3>
    <p>
      Our Website is using Google Analytics, an analytics tool from Google Inc. (“Google”).<br>
      In this context, pseudonymized user profiles are created and cookies (see 2.) are used.<br>
      The information gathered by the cookie is sent to Google’s servers located in the USA and stored there.<br>
      <br>
      The following data will be gathered and submitted to Google:<br>
    </p>
    <br>
    <ul>
      <li>Browser type and version</li>
      <li>Operating system</li>
      <li>Referrer-URL (previously visited site)</li>
      <li>Current page</li>
      <li>Anonymized IP address</li>
      <li>Time of request</li>
    </ul>
    <br>
    <p>
      The information will be used to analyze the usage of Lichter.io, to create reports about the user’s activity
      and to offer other services that are related to our user’s activity and the usage of the web.<br>
      Your IP address will not be consolidated with other data stored on Google’s servers.<br>
      <br>
      You can prevent us and Google Analytics setting a cookie via your browser settings.<br>
      Please notice that the usage of our services and the user experience could suffer from preventing our Website to
      set a cookie.<br>
      If you want to prevent Google from setting any cookies on your computer, you can use
      <a
        href="http://tools.google.com/dlpage/gaoptout?hl=en"
        rel="noreferrer noopener nofollow"
        target="_blank"
      >this browser-plugin</a>.<br>
      <br>
      Alternatively, or if you’re using a mobile browser, click on
      <a href="#" @click.prevent="optOut">this link</a>
      to prevent Google from gathering data on
      our Website.<br>
      With clicking this link, an opt-out cookie will be saved on your device.<br>
      If you delete your cookies, you will need to click on the link again to stay opted-out.<br>
      <br>
      You find further information about privacy protection and Google Analytics in
      <a
        href="https://support.google.com/analytics/answer/6004245?hl=de"
        rel="noreferrer noopener nofollow"
        target="_blank"
      >this Google Help articles</a>
    </p>

    <h2>
      Privacy Statement Changes
    </h2>
    <p>
      We may change this Privacy Statement from time to time, and in our sole discretion. We encourage you to frequently
      check this page for any changes to this Privacy Statement. Your continued use of the Website after any change in
      this Privacy Statement will constitute your acceptance of such change.

      last edited: 18.08.2019
    </p>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Privacy - Lichter.io',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  },
  methods: {
    optOut () {
      document.cookie = 'ga_optout=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
      this.$ga.disable()
    }
  }
}
</script>
