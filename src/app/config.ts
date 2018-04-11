export let CONFIG = {
  Settings: {
    BASEAPI: 'https://localhost:44356/api', // .NetCore2.0 WebAPI
    // CLIENT_ID: '1ad953ea-f3e2-42d9-9045-bbbd7af52a19',
    // AUTHORITY: 'https://login.microsoftonline.com/quintiles.onmicrosoft.com',
    CLIENT_ID: 'eb15a0f1-e0a7-4f46-a3ec-6a9dc468546e', // https://apps.dev.microsoft.com’
    AUTHORITY: '',
    TENANT: 'Tenant1',
    TENANT_ID: 'TenantId', // found in Azure->Active Directory->Properties Pane, TennantID = Directory ID
    RESPONSE_TYPE: 'id_token',
    RESPONSE_MODE: 'id_token',
    STATE: '',
    MS_GRAPH_URI: 'https://graph.microsoft.com/',
    REDIRECT_URI : 'http://localhost:4200/home',
    POST_LOGOUT_REDIRECT : 'https://localhost:44389',
    MSGRAPH_BETA_API: 'https://graph.microsoft.com/beta/',
    MSGRAPH_v1_API: 'https://graph.microsoft.com/v1.0/',
    SCOPES: ['User.Read'],
    ADMIN_CONSENT: true
  }
};
