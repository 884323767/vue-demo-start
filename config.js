const env = '__env_config__';

export default {
  isTest: env === 'test' || env === '__env_config__',
  isDemo: env === 'demo',
  isUAT: env === 'uat',
  isLive: env === 'live',
};
