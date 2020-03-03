// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  production: true,
  hmr: false,
  version: env.npm_package_version,
  serverUrl: 'https://selfitportal.herokuapp.com/',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR'],
  chave: 'producao',
  API_PROSELF_UNI: 'http://treino-union.proselfit.com.br:8080',
  API_PROSELF: 'http://lb-zw-web-939419841.sa-east-1.elb.amazonaws.com/api',
  API_REDBOX_PROD: 'https://treino-backend.proselfit.com.br',
  API_SITE: 'https://backend-selfitacademias.selfitacademias.com.br',
  API_RED_PAYMENT: 'http://red-payments-dev.sa-east-1.elasticbeanstalk.com',
  API_FOTOS: 'http://18.229.174.173:3001',
  AUTH_CAPPTA: '669CAB98F33D4F70B768217457313582'
};
