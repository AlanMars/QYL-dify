# Dify Backend API

## Usage

1. Start the docker-compose stack

   The backend require some middleware, including PostgreSQL, Redis, and Weaviate, which can be started together using `docker-compose`.

   ```bash
   cd ../docker
   docker-compose -f docker-compose.middleware.yaml -p dify up -d
   cd ../api
   ```

2. Copy `.env.example` to `.env`
3. Generate a `SECRET_KEY` in the `.env` file.

   ```bash
   openssl rand -base64 42
   ```

   ⚠️ If you use annaconda, create a new environment and activate it

   ```bash
   conda create --name dify python=3.10
   conda activate dify
   ```

4. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

5. Run migrate

   Before the first launch, migrate the database to the latest version.

   ```bash
   flask db upgrade
   ```

   ⚠️ If you encounter problems with jieba, for example

   ```bash
   > flask db upgrade
   Error: While importing 'app', an ImportError was raised:
   ```

   Please run the following command instead.

   ```bash
   pip install -r requirements.txt --upgrade --force-reinstall
   ```

6. Start backend:

   ```bash
   flask run --host 0.0.0.0 --port=5001 --debug
   ```

7. Setup your application by visiting <http://localhost:5001/console/api/setup> or other apis...

8. If you need to debug local async processing, you can run `celery -A app.celery worker -P gevent -c 1 --loglevel INFO -Q dataset,generation,mail`, celery can do dataset importing and other async tasks.

9. Start frontend

   You can start the frontend by running `npm install && npm run dev` in web/ folder, or you can use docker to start the frontend, for example:

   ```
   docker run -it -d --platform linux/amd64 -p 3000:3000 -e EDITION=SELF_HOSTED -e CONSOLE_URL=http://127.0.0.1:5001 --name web-self-hosted langgenius/dify-web:latest
   ```

   This will start a dify frontend, now you are all set, happy coding!

10. Other tools

   ```
   # flask
   Usage: flask [OPTIONS] COMMAND [ARGS]...
   
     A general utility script for Flask applications.
   
     An application to load must be given with the '--app' option, 'FLASK_APP'
     environment variable, or with a 'wsgi.py' or 'app.py' file in the current
     directory.
   
   Options:
     -e, --env-file FILE   Load environment variables from this file. python-
                           dotenv must be installed.
     -A, --app IMPORT      The Flask application or factory function to load, in
                           the form 'module:name'. Module can be a dotted import
                           or file path. Name is not required if it is 'app',
                           'application', 'create_app', or 'make_app', and can be
                           'name(args)' to pass arguments.
     --debug / --no-debug  Set debug mode.
     --version             Show the Flask version.
     --help                Show this message and exit.
   
   Commands:
     add-recommended-app             Add recommended application.
     clean-unused-dataset-indexes    Clean unused dataset indexes.
     create-qdrant-indexes           Create qdrant indexes.
     db                              Perform database migrations.
     generate-invitation-codes       Generate invitation codes.
     normalization-collections       restore all collections in one
     recreate-all-dataset-indexes    Recreate all dataset indexes.
     reset-email                     Reset the account email.
     reset-encrypt-key-pair          Reset the asymmetric key pair of...
     reset-password                  Reset the account password.
     routes                          Show the routes for the app.
     run                             Run a development server.
     shell                           Run a shell in the app context.
     sync-anthropic-hosted-providers
                                     Sync anthropic hosted providers.
     update-qdrant-indexes           Update qdrant indexes.
     update_app_model_configs        Migrate data to support paragraph...
   ```
   
   ```
   # flask routes
   Endpoint                                              Methods             Rule                                                                                                  
   ----------------------------------------------------  ------------------  ------------------------------------------------------------------------------------------------------
   console.accountavatarapi                              POST                /console/api/account/avatar                                                                           
   console.accountinitapi                                POST                /console/api/account/init                                                                             
   console.accountintegrateapi                           GET                 /console/api/account/integrates                                                                       
   console.accountinterfacelanguageapi                   POST                /console/api/account/interface-language                                                               
   console.accountinterfacethemeapi                      POST                /console/api/account/interface-theme                                                                  
   console.accountnameapi                                POST                /console/api/account/name                                                                             
   console.accountpasswordapi                            POST                /console/api/account/password                                                                         
   console.accountprofileapi                             GET                 /console/api/account/profile                                                                          
   console.accounttimezoneapi                            POST                /console/api/account/timezone                                                                         
   console.activateapi                                   POST                /console/api/activate                                                                                 
   console.activatecheckapi                              GET                 /console/api/activate/check                                                                           
   console.appapi                                        DELETE, GET         /console/api/apps/<uuid:app_id>                                                                       
   console.appapikeylistresource                         GET, POST           /console/api/apps/<uuid:resource_id>/api-keys                                                         
   console.appapikeyresource                             DELETE              /console/api/apps/<uuid:resource_id>/api-keys/<uuid:api_key_id>                                       
   console.appapistatus                                  POST                /console/api/apps/<uuid:app_id>/api-enable                                                            
   console.appcopy                                       POST                /console/api/apps/<uuid:app_id>/copy                                                                  
   console.appiconapi                                    POST                /console/api/apps/<uuid:app_id>/icon                                                                  
   console.applistapi                                    GET, POST           /console/api/apps                                                                                     
   console.appnameapi                                    POST                /console/api/apps/<uuid:app_id>/name                                                                  
   console.appsite                                       POST                /console/api/apps/<uuid:app_id>/site                                                                  
   console.appsiteaccesstokenreset                       POST                /console/api/apps/<uuid:app_id>/site/access-token-reset                                               
   console.appsitestatus                                 POST                /console/api/apps/<uuid:app_id>/site-enable                                                           
   console.apptemplateapi                                GET                 /console/api/app-templates                                                                            
   console.averageresponsetimestatistic                  GET                 /console/api/apps/<uuid:app_id>/statistics/average-response-time                                      
   console.averagesessioninteractionstatistic            GET                 /console/api/apps/<uuid:app_id>/statistics/average-session-interactions                               
   console.chatconversationapi                           GET                 /console/api/apps/<uuid:app_id>/chat-conversations                                                    
   console.chatconversationdetailapi                     DELETE, GET         /console/api/apps/<uuid:app_id>/chat-conversations/<uuid:conversation_id>                             
   console.chatmessageapi                                POST                /console/api/apps/<uuid:app_id>/chat-messages                                                         
   console.chatmessageaudioapi                           POST                /console/api/apps/<uuid:app_id>/audio-to-text                                                         
   console.chatmessagestopapi                            POST                /console/api/apps/<uuid:app_id>/chat-messages/<string:task_id>/stop                                   
   console.completionconversationapi                     GET                 /console/api/apps/<uuid:app_id>/completion-conversations                                              
   console.completionconversationdetailapi               DELETE, GET         /console/api/apps/<uuid:app_id>/completion-conversations/<uuid:conversation_id>                       
   console.completionmessageapi                          POST                /console/api/apps/<uuid:app_id>/completion-messages                                                   
   console.completionmessagestopapi                      POST                /console/api/apps/<uuid:app_id>/completion-messages/<string:task_id>/stop                             
   console.console_chat_messages                         GET                 /console/api/apps/<uuid:app_id>/chat-messages                                                         
   console.console_message                               GET                 /console/api/apps/<uuid:app_id>/messages/<uuid:message_id>                                            
   console.dailyconversationstatistic                    GET                 /console/api/apps/<uuid:app_id>/statistics/daily-conversations                                        
   console.dailyterminalsstatistic                       GET                 /console/api/apps/<uuid:app_id>/statistics/daily-end-users                                            
   console.dailytokencoststatistic                       GET                 /console/api/apps/<uuid:app_id>/statistics/token-costs                                                
   console.datasetapi                                    DELETE, GET, PATCH  /console/api/datasets/<uuid:dataset_id>                                                               
   console.datasetapikeylistresource                     GET, POST           /console/api/datasets/<uuid:resource_id>/api-keys                                                     
   console.datasetapikeyresource                         DELETE              /console/api/datasets/<uuid:resource_id>/api-keys/<uuid:api_key_id>                                   
   console.datasetdocumentlistapi                        GET, POST           /console/api/datasets/<uuid:dataset_id>/documents                                                     
   console.datasetdocumentsegmentaddapi                  POST                /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/segment                          
   console.datasetdocumentsegmentapi                     PATCH               /console/api/datasets/<uuid:dataset_id>/segments/<uuid:segment_id>/<string:action>                    
   console.datasetdocumentsegmentbatchimportapi          GET, POST           /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/segments/batch_import            
   console.datasetdocumentsegmentbatchimportapi          GET, POST           /console/api/datasets/batch_import_status/<uuid:job_id>                                               
   console.datasetdocumentsegmentlistapi                 GET                 /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/segments                         
   console.datasetdocumentsegmentupdateapi               DELETE, PATCH       /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/segments/<uuid:segment_id>       
   console.datasetindexingestimateapi                    POST                /console/api/datasets/indexing-estimate                                                               
   console.datasetindexingstatusapi                      GET                 /console/api/datasets/<uuid:dataset_id>/indexing-status                                               
   console.datasetinitapi                                POST                /console/api/datasets/init                                                                            
   console.datasetlistapi                                GET, POST           /console/api/datasets                                                                                 
   console.datasetqueryapi                               GET                 /console/api/datasets/<uuid:dataset_id>/queries                                                       
   console.datasetrelatedapplistapi                      GET                 /console/api/datasets/<uuid:dataset_id>/related-apps                                                  
   console.datasourceapi                                 GET, PATCH          /console/api/data-source/integrates/<uuid:binding_id>/<string:action>                                 
   console.datasourceapi                                 GET, PATCH          /console/api/data-source/integrates                                                                   
   console.datasourcenotionapi                           GET, POST           /console/api/notion/workspaces/<uuid:workspace_id>/pages/<uuid:page_id>/<string:page_type>/preview    
   console.datasourcenotionapi                           GET, POST           /console/api/datasets/notion-indexing-estimate                                                        
   console.datasourcenotiondatasetsyncapi                GET                 /console/api/datasets/<uuid:dataset_id>/notion/sync                                                   
   console.datasourcenotiondocumentsyncapi               GET                 /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/notion/sync                      
   console.datasourcenotionlistapi                       GET                 /console/api/notion/pre-import/pages                                                                  
   console.defaultmodelapi                               GET, POST           /console/api/workspaces/current/default-model                                                         
   console.documentbatchindexingestimateapi              GET                 /console/api/datasets/<uuid:dataset_id>/batch/<string:batch>/indexing-estimate                        
   console.documentbatchindexingstatusapi                GET                 /console/api/datasets/<uuid:dataset_id>/batch/<string:batch>/indexing-status                          
   console.documentdeleteapi                             DELETE              /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>                                  
   console.documentdetailapi                             GET                 /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>                                  
   console.documentindexingestimateapi                   GET                 /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/indexing-estimate                
   console.documentindexingstatusapi                     GET                 /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/indexing-status                  
   console.documentlimitapi                              GET                 /console/api/datasets/limit                                                                           
   console.documentmetadataapi                           PUT                 /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/metadata                         
   console.documentpauseapi                              PATCH               /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/processing/pause                 
   console.documentprocessingapi                         PATCH               /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/processing/<string:action>       
   console.documentrecoverapi                            PATCH               /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/processing/resume                
   console.documentstatusapi                             PATCH               /console/api/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/status/<string:action>           
   console.fileapi                                       GET, POST           /console/api/files/upload                                                                             
   console.filepreviewapi                                GET                 /console/api/files/<uuid:file_id>/preview                                                             
   console.getprocessruleapi                             GET                 /console/api/datasets/process-rule                                                                    
   console.hittestingapi                                 POST                /console/api/datasets/<uuid:dataset_id>/hit-testing                                                   
   console.info                                          GET                 /console/api/info                                                                                     
   console.insertexploreappapi                           DELETE              /console/api/admin/insert-explore-apps/<uuid:app_id>                                                  
   console.insertexploreapplistapi                       POST                /console/api/admin/insert-explore-apps                                                                
   console.installed_app_audio                           POST                /console/api/installed-apps/<uuid:installed_app_id>/audio-to-text                                     
   console.installed_app_chat_completion                 POST                /console/api/installed-apps/<uuid:installed_app_id>/chat-messages                                     
   console.installed_app_completion                      POST                /console/api/installed-apps/<uuid:installed_app_id>/completion-messages                               
   console.installed_app_conversation                    DELETE              /console/api/installed-apps/<uuid:installed_app_id>/conversations/<uuid:c_id>                         
   console.installed_app_conversation_pin                PATCH               /console/api/installed-apps/<uuid:installed_app_id>/conversations/<uuid:c_id>/pin                     
   console.installed_app_conversation_rename             POST                /console/api/installed-apps/<uuid:installed_app_id>/conversations/<uuid:c_id>/name                    
   console.installed_app_conversation_unpin              PATCH               /console/api/installed-apps/<uuid:installed_app_id>/conversations/<uuid:c_id>/unpin                   
   console.installed_app_conversations                   GET                 /console/api/installed-apps/<uuid:installed_app_id>/conversations                                     
   console.installed_app_message_feedback                POST                /console/api/installed-apps/<uuid:installed_app_id>/messages/<uuid:message_id>/feedbacks              
   console.installed_app_messages                        GET                 /console/api/installed-apps/<uuid:installed_app_id>/messages                                          
   console.installed_app_more_like_this                  GET                 /console/api/installed-apps/<uuid:installed_app_id>/messages/<uuid:message_id>/more-like-this         
   console.installed_app_parameters                      GET                 /console/api/installed-apps/<uuid:installed_app_id>/parameters                                        
   console.installed_app_saved_message                   DELETE              /console/api/installed-apps/<uuid:installed_app_id>/saved-messages/<uuid:message_id>                  
   console.installed_app_saved_messages                  GET, POST           /console/api/installed-apps/<uuid:installed_app_id>/saved-messages                                    
   console.installed_app_stop_chat_completion            POST                /console/api/installed-apps/<uuid:installed_app_id>/chat-messages/<string:task_id>/stop               
   console.installed_app_stop_completion                 POST                /console/api/installed-apps/<uuid:installed_app_id>/completion-messages/<string:task_id>/stop         
   console.installed_app_suggested_question              GET                 /console/api/installed-apps/<uuid:installed_app_id>/messages/<uuid:message_id>/suggested-questions    
   console.installedappapi                               DELETE, PATCH       /console/api/installed-apps/<uuid:installed_app_id>                                                   
   console.installedappslistapi                          GET, POST           /console/api/installed-apps                                                                           
   console.introductiongenerateapi                       POST                /console/api/introduction-generate                                                                    
   console.loginapi                                      POST                /console/api/login                                                                                    
   console.logoutapi                                     GET                 /console/api/logout                                                                                   
   console.membercancelinviteapi                         DELETE              /console/api/workspaces/current/members/<uuid:member_id>                                              
   console.memberinviteemailapi                          POST                /console/api/workspaces/current/members/invite-email                                                  
   console.memberlistapi                                 GET                 /console/api/workspaces/current/members                                                               
   console.memberupdateroleapi                           PUT                 /console/api/workspaces/current/members/<uuid:member_id>/update-role                                  
   console.messageannotationapi                          POST                /console/api/apps/<uuid:app_id>/annotations                                                           
   console.messageannotationcountapi                     GET                 /console/api/apps/<uuid:app_id>/annotations/count                                                     
   console.messagefeedbackapi                            POST                /console/api/apps/<uuid:app_id>/feedbacks                                                             
   console.messagemorelikethisapi                        GET                 /console/api/apps/<uuid:app_id>/completion-messages/<uuid:message_id>/more-like-this                  
   console.messagesuggestedquestionapi                   GET                 /console/api/apps/<uuid:app_id>/chat-messages/<uuid:message_id>/suggested-questions                   
   console.modelconfigresource                           POST                /console/api/apps/<uuid:app_id>/model-config                                                          
   console.modelproviderfreequotaqualificationverifyapi  GET                 /console/api/workspaces/current/model-providers/<string:provider_name>/free-quota-qualification-verify
   console.modelproviderfreequotasubmitapi               POST                /console/api/workspaces/current/model-providers/<string:provider_name>/free-quota-submit              
   console.modelproviderlistapi                          GET                 /console/api/workspaces/current/model-providers                                                       
   console.modelprovidermodelparameterruleapi            GET                 /console/api/workspaces/current/model-providers/<string:provider_name>/models/parameter-rules         
   console.modelprovidermodelupdateapi                   DELETE, POST        /console/api/workspaces/current/model-providers/<string:provider_name>/models                         
   console.modelprovidermodelvalidateapi                 POST                /console/api/workspaces/current/model-providers/<string:provider_name>/models/validate                
   console.modelproviderpaymentcheckouturlapi            GET                 /console/api/workspaces/current/model-providers/<string:provider_name>/checkout-url                   
   console.modelproviderupdateapi                        DELETE, POST        /console/api/workspaces/current/model-providers/<string:provider_name>                                
   console.modelprovidervalidateapi                      POST                /console/api/workspaces/current/model-providers/<string:provider_name>/validate                       
   console.oauthcallback                                 GET                 /console/api/oauth/authorize/<provider>                                                               
   console.oauthdatasource                               GET                 /console/api/oauth/data-source/<string:provider>                                                      
   console.oauthdatasourcecallback                       GET                 /console/api/oauth/data-source/callback/<string:provider>                                             
   console.oauthdatasourcesync                           GET                 /console/api/oauth/data-source/<string:provider>/<uuid:binding_id>/sync                               
   console.oauthlogin                                    GET                 /console/api/oauth/login/<provider>                                                                   
   console.preferredprovidertypeupdateapi                POST                /console/api/workspaces/current/model-providers/<string:provider_name>/preferred-provider-type        
   console.providerlistapi                               GET                 /console/api/workspaces/current/providers                                                             
   console.recommendedappapi                             DELETE, GET, POST   /console/api/explore/apps/<uuid:app_id>                                                               
   console.recommendedapplistapi                         GET                 /console/api/explore/apps                                                                             
   console.rulegenerateapi                               POST                /console/api/rule-generate                                                                            
   console.setupapi                                      GET, POST           /console/api/setup                                                                                    
   console.stripewebhookapi                              POST                /console/api/webhook/stripe                                                                           
   console.switchworkspaceapi                            POST                /console/api/workspaces/switch                                                                        
   console.tenantlistapi                                 GET                 /console/api/workspaces                                                                               
   console.tokenspersecondstatistic                      GET                 /console/api/apps/<uuid:app_id>/statistics/tokens-per-second                                          
   console.toolprovidercredentialsapi                    POST                /console/api/workspaces/current/tool-providers/<provider>/credentials                                 
   console.toolprovidercredentialsvalidateapi            POST                /console/api/workspaces/current/tool-providers/<provider>/credentials-validate                        
   console.toolproviderlistapi                           GET                 /console/api/workspaces/current/tool-providers                                                        
   console.universalchatapi                              POST                /console/api/universal-chat/messages                                                                  
   console.universalchataudioapi                         POST                /console/api/universal-chat/audio-to-text                                                             
   console.universalchatconversationapi                  DELETE              /console/api/universal-chat/conversations/<uuid:c_id>                                                 
   console.universalchatconversationlistapi              GET                 /console/api/universal-chat/conversations                                                             
   console.universalchatconversationpinapi               PATCH               /console/api/universal-chat/conversations/<uuid:c_id>/pin                                             
   console.universalchatconversationrenameapi            POST                /console/api/universal-chat/conversations/<uuid:c_id>/name                                            
   console.universalchatconversationunpinapi             PATCH               /console/api/universal-chat/conversations/<uuid:c_id>/unpin                                           
   console.universalchatmessagefeedbackapi               POST                /console/api/universal-chat/messages/<uuid:message_id>/feedbacks                                      
   console.universalchatmessagelistapi                   GET                 /console/api/universal-chat/messages                                                                  
   console.universalchatmessagesuggestedquestionapi      GET                 /console/api/universal-chat/messages/<uuid:message_id>/suggested-questions                            
   console.universalchatparameterapi                     GET                 /console/api/universal-chat/parameters                                                                
   console.universalchatstopapi                          POST                /console/api/universal-chat/messages/<string:task_id>/stop                                            
   console.usersatisfactionratestatistic                 GET                 /console/api/apps/<uuid:app_id>/statistics/user-satisfaction-rate                                     
   console.validmodelapi                                 GET                 /console/api/workspaces/current/models/model-type/<string:model_type>                                 
   console.versionapi                                    GET                 /console/api/version                                                                                  
   console.workspacelistapi                              GET                 /console/api/all-workspaces                                                                           
   console.workspaces_current                            GET                 /console/api/workspaces/current                                                                       
   console.workspaces_current_providers_token            POST                /console/api/workspaces/current/providers/<provider>/token                                            
   console.workspaces_current_providers_token_validate   POST                /console/api/workspaces/current/providers/<provider>/token-validate                                   
   health                                                GET                 /health                                                                                               
   pool_stat                                             GET                 /db-pool-stat                                                                                         
   service_api.appparameterapi                           GET                 /v1/parameters                                                                                        
   service_api.audioapi                                  POST                /v1/audio-to-text                                                                                     
   service_api.chatapi                                   POST                /v1/chat-messages                                                                                     
   service_api.chatstopapi                               POST                /v1/chat-messages/<string:task_id>/stop                                                               
   service_api.completionapi                             POST                /v1/completion-messages                                                                               
   service_api.completionstopapi                         POST                /v1/completion-messages/<string:task_id>/stop                                                         
   service_api.conversation                              GET                 /v1/conversations/<uuid:c_id>                                                                         
   service_api.conversation_detail                       DELETE              /v1/conversations/<uuid:c_id>                                                                         
   service_api.conversation_name                         POST                /v1/conversations/<uuid:c_id>/name                                                                    
   service_api.conversationapi                           GET                 /v1/conversations                                                                                     
   service_api.documentapi                               DELETE              /v1/documents/<uuid:document_id>                                                                      
   service_api.documentlistapi                           POST                /v1/documents                                                                                         
   service_api.messagefeedbackapi                        POST                /v1/messages/<uuid:message_id>/feedbacks                                                              
   service_api.messagelistapi                            GET                 /v1/messages                                                                                          
   static                                                GET                 /static/<path:filename>                                                                               
   threads                                               GET                 /threads                                                                                              
   web.appparameterapi                                   GET                 /api/parameters                                                                                       
   web.appsiteapi                                        GET                 /api/site                                                                                             
   web.audioapi                                          POST                /api/audio-to-text                                                                                    
   web.chatapi                                           POST                /api/chat-messages                                                                                    
   web.chatstopapi                                       POST                /api/chat-messages/<string:task_id>/stop                                                              
   web.completionapi                                     POST                /api/completion-messages                                                                              
   web.completionstopapi                                 POST                /api/completion-messages/<string:task_id>/stop                                                        
   web.conversationapi                                   DELETE              /api/conversations/<uuid:c_id>                                                                        
   web.conversationlistapi                               GET                 /api/conversations                                                                                    
   web.conversationpinapi                                PATCH               /api/conversations/<uuid:c_id>/pin                                                                    
   web.conversationunpinapi                              PATCH               /api/conversations/<uuid:c_id>/unpin                                                                  
   web.messagefeedbackapi                                POST                /api/messages/<uuid:message_id>/feedbacks                                                             
   web.messagelistapi                                    GET                 /api/messages                                                                                         
   web.messagemorelikethisapi                            GET                 /api/messages/<uuid:message_id>/more-like-this                                                        
   web.messagesuggestedquestionapi                       GET                 /api/messages/<uuid:message_id>/suggested-questions                                                   
   web.passportresource                                  GET                 /api/passport                                                                                         
   web.savedmessageapi                                   DELETE              /api/saved-messages/<uuid:message_id>                                                                 
   web.savedmessagelistapi                               GET, POST           /api/saved-messages                                                                                   
   web.web_conversation_name                             POST                /api/conversations/<uuid:c_id>/name         
   ```
   
