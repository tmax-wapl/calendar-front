module.exports = {
  waplUiVendor: {
    test: /[\\/]node_modules[\\/]@wapl[\\-]ui/,
    name: 'ui-vendors',
    maxSize: 500000,
    chunks: 'all',
  },
  waplCoreVendor: {
    test: /[\\/]node_modules[\\/]@wapl[\\-]core/,
    name: 'core-vendors',
    maxSize: 500000,
    chunks: 'all',
  },
  muiVendor: {
    test: /[\\/]node_modules[\\/]@mui[\\-]/,
    name: 'mui-vendors',
    chunks: 'all',
  },
  calVendor: {
    test: /[\\/]node_modules[\\/](luxon|@fullcalendar)[\\/]/,
    name: 'cal-vendors',
    maxSize: 500000,
    chunks: 'all',
  },
  react: {
    test: /[\\/]node_modules[\\/](react|react-dom|react-virtuoso)[\\/]/,
    maxSize: 500000,
    name: 'react',
    chunks: 'all',
  },
  rrule: {
    test: /[\\/]node_modules[\\/](rrule|mobx)[\\-]/,
    name: 'rrule_mobx',
    chunks: 'all',
  },
  swiper: {
    test: /[\\/]node_modules[\\/](swiper)[\\-]/,
    name: 'swiper',
    chunks: 'all',
  },
};
