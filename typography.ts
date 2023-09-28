import { type PluginUtils } from 'tailwindcss/types/config'

export function typographyStyles({ theme }: PluginUtils) {
  return {
    DEFAULT: {
      css: {
        '--tw-prose-body': theme('colors.zinc.200'),
        '--tw-prose-headings': theme('colors.zinc.100'),
        '--tw-prose-links': theme('colors.red.400'),
        '--tw-prose-links-hover': theme('colors.red.400'),
        '--tw-prose-underline': theme('colors.red.400 / 0.3'),
        '--tw-prose-underline-hover': theme('colors.red.400'),
        '--tw-prose-bold': theme('colors.zinc.200'),
        '--tw-prose-counters': theme('colors.zinc.200'),
        '--tw-prose-bullets': theme('colors.zinc.200'),
        '--tw-prose-hr': theme('colors.zinc.700 / 0.4'),
        '--tw-prose-quote-borders': theme('colors.zinc.500'),
        '--tw-prose-captions': theme('colors.zinc.500'),
        '--tw-prose-code': theme('colors.zinc.300'),
        '--tw-prose-code-bg': theme('colors.zinc.200 / 0.05'),
        '--tw-prose-pre-code': theme('colors.zinc.100'),
        '--tw-prose-pre-bg': 'rgb(0 0 0 / 0.4)',
        '--tw-prose-pre-border': theme('colors.zinc.200 / 0.1'),
        '--tw-prose-th-borders': theme('colors.zinc.700'),
        '--tw-prose-td-borders': theme('colors.zinc.800'),

        // Base
        color: 'var(--tw-prose-body)',
        lineHeight: theme('lineHeight.7'),
        '> *': {
          marginTop: theme('spacing.10'),
          marginBottom: theme('spacing.10'),
        },
        p: {
          marginTop: theme('spacing.7'),
          marginBottom: theme('spacing.7'),
        },

        // Headings
        'h2, h3': {
          color: 'var(--tw-prose-headings)',
          fontWeight: theme('fontWeight.semibold'),
        },
        h2: {
          fontSize: theme('fontSize.xl')[0],
          lineHeight: theme('lineHeight.7'),
          marginTop: theme('spacing.20'),
          marginBottom: theme('spacing.4'),
        },
        h3: {
          fontSize: theme('fontSize.base')[0],
          lineHeight: theme('lineHeight.7'),
          marginTop: theme('spacing.16'),
          marginBottom: theme('spacing.4'),
        },
        ':is(h2, h3) + *': {
          marginTop: 0,
        },

        // Images
        img: {
          borderRadius: theme('borderRadius.3xl'),
        },

        // Inline elements
        a: {
          color: 'var(--tw-prose-links)',
          fontWeight: theme('fontWeight.semibold'),
          textDecoration: 'underline',
          textDecorationColor: 'var(--tw-prose-underline)',
          transitionProperty: 'color, text-decoration-color',
          transitionDuration: theme('transitionDuration.150'),
          transitionTimingFunction: theme('transitionTimingFunction.in-out'),
        },
        'a:hover': {
          color: 'var(--tw-prose-links-hover)',
          textDecorationColor: 'var(--tw-prose-underline-hover)',
        },
        strong: {
          color: 'var(--tw-prose-bold)',
          fontWeight: theme('fontWeight.semibold'),
        },
        code: {
          display: 'inline-block',
          color: 'var(--tw-prose-code)',
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.semibold'),
          backgroundColor: 'var(--tw-prose-code-bg)',
          borderRadius: theme('borderRadius.lg'),
        },
        'a code': {
          color: 'inherit',
        },
        ':is(h2, h3) code': {
          fontWeight: theme('fontWeight.bold'),
        },

        // Quotes
        blockquote: {
          paddingLeft: theme('spacing.6'),
          borderLeftWidth: theme('borderWidth.2'),
          borderLeftColor: 'var(--tw-prose-quote-borders)',
          fontStyle: 'italic',
        },

        // Figures
        figcaption: {
          color: 'var(--tw-prose-captions)',
          fontSize: theme('fontSize.sm')[0],
          lineHeight: theme('lineHeight.6'),
          marginTop: theme('spacing.3'),
        },
        'figcaption > p': {
          margin: 0,
        },

        // Lists
        ul: {
          listStyleType: 'disc',
        },
        ol: {
          listStyleType: 'decimal',
        },
        'ul, ol': {
          paddingLeft: theme('spacing.6'),
        },
        li: {
          marginTop: theme('spacing.2'),
          marginBottom: theme('spacing.2'),
          paddingLeft: theme('spacing[3.5]'),
        },
        'li::marker': {
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.semibold'),
        },
        'ol > li::marker': {
          color: 'var(--tw-prose-counters)',
        },
        'ul > li::marker': {
          color: 'var(--tw-prose-bullets)',
        },
        'li :is(ol, ul)': {
          marginTop: theme('spacing.1'),
          marginBottom: theme('spacing.1'),
        },
        'li :is(li, p)': {
          marginTop: theme('spacing.0.5'),
          marginBottom: theme('spacing.0.5'),
        },

        // Code blocks
        pre: {
          color: 'var(--tw-prose-pre-code)',
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.medium'),
          backgroundColor: 'var(--tw-prose-pre-bg)',
          borderRadius: theme('borderRadius.lg'),
          paddingLeft: theme('spacing.8'),
          paddingRight: theme('spacing.8'),
          paddingTop: theme('spacing.4'),
          paddingBottom: theme('spacing.4'),
          overflowX: 'auto',
          border: '1px solid',
          display: 'flex',
          flex: '1',
          borderColor: 'var(--tw-prose-pre-border)',
        },
        'pre code': {
          display: 'flex',
          flexDirection: 'column',
          color: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          backgroundColor: 'transparent',
          borderRadius: 0,
          padding: 0,
          width: '100%',
        },

        // Horizontal rules
        hr: {
          marginTop: theme('spacing.20'),
          marginBottom: theme('spacing.20'),
          borderTopWidth: '1px',
          borderColor: 'var(--tw-prose-hr)',
          '@screen lg': {
            marginLeft: `calc(${theme('spacing.12')} * -1)`,
            marginRight: `calc(${theme('spacing.12')} * -1)`,
          },
        },

        // Tables
        table: {
          width: '100%',
          tableLayout: 'auto',
          textAlign: 'left',
          fontSize: theme('fontSize.sm')[0],
        },
        thead: {
          borderBottomWidth: '1px',
          borderBottomColor: 'var(--tw-prose-th-borders)',
        },
        'thead th': {
          color: 'var(--tw-prose-headings)',
          fontWeight: theme('fontWeight.semibold'),
          verticalAlign: 'bottom',
          paddingBottom: theme('spacing.2'),
        },
        'thead th:not(:first-child)': {
          paddingLeft: theme('spacing.2'),
        },
        'thead th:not(:last-child)': {
          paddingRight: theme('spacing.2'),
        },
        'tbody tr': {
          borderBottomWidth: '1px',
          borderBottomColor: 'var(--tw-prose-td-borders)',
        },
        'tbody tr:last-child': {
          borderBottomWidth: 0,
        },
        'tbody td': {
          verticalAlign: 'baseline',
        },
        tfoot: {
          borderTopWidth: '1px',
          borderTopColor: 'var(--tw-prose-th-borders)',
        },
        'tfoot td': {
          verticalAlign: 'top',
        },
        ':is(tbody, tfoot) td': {
          paddingTop: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
        },
        ':is(tbody, tfoot) td:not(:first-child)': {
          paddingLeft: theme('spacing.2'),
        },
        ':is(tbody, tfoot) td:not(:last-child)': {
          paddingRight: theme('spacing.2'),
        },
      },
    },
  }
}
