export default {
  __dangerouslyDisableSanitizers: ['script'],
  titleTemplate: c => c ? `${c} - Lichter.io` : 'Lichter.io - Alexander Lichter',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(
        {
          '@context': 'http://schema.org',
          '@type': 'Person',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'DE',
            addressLocality: 'Leipzig',
            addressRegion: 'Sachsen',
            postalCode: '04289',
            streetAddress: 'Corotweg 15'
          },
          name: 'Alexander Lichter',
          image: 'https://lichter.io/img/me@2x.jpg',
          email: 'mailto:hello@lichter.io',
          telephone: '+49 17670625208',
          jobTitle: 'Founder of Developmint',
          url: 'https://lichter.io',
          sameAs: [
            'https://twitter.com/TheAlexLichter',
            'https://github.com/manniL',
            'https://www.developmint.de/',
            'https://stackoverflow.com/users/3975480/mannil',
            'https://linkedin.com/in/alexanderlichter'
          ]
        })
    }
  ]
}
