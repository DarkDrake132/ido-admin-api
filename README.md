# IDO-admin-page-api
Internal project - API Server for admin of IDO platform to manage database

## Admin

## Applied projects
<dl>
<dt>path: '/api/applied'</dt>
<dt>Type: Applied Project</dt>
</dl>

| Field | Type | Description |
| --- | :---: |  --- |
| Id | <code>Interger</code> | Project ID |
| PersonalName | <code>String</code> | Project's owner name |
| PersonalEmail | <code>String</code> | Project's owner mail |
| PersonalTelegram | <code>String</code> | Project's onwer telegram |
| ProjectName | <code>String</code> | Project's name |
| Description | <code>Text</code> | short description about project |
| Website | <code>String</code> | Link to project website |
| Twitter | <code>String</code> | Project's twitter |
| Telegram | <code>String</code> | Project's telegram |
| ChainId | <code>Interger</code> | Chain of project |
| DevelopmentState | <code>String</code> | state of project development |
| Whitepaper | <code>String</code> | Project's whitepaper |
| Tokenomic | <code>String</code> | Project's tokenomic |
| BeforeRaise | <code>Text</code> | where project has raised before |
| TotalRaise | <code>Interger</code> | Total money project has raised before  |
| Status | <code>String</code> | project's status on admin list |
| isDeleted | <code>Boolean</code> | check if project was delete |

**Define status field**:
| Value | Type | Description |
| NEW | <code>String</code> | The project has just been created |
| PROCESS | <code>String</code> | The project is in progress |
| APPROVE | <code>String</code> | The project has been accepted and the pool is created |
| REFUSE | <code>String</code> | The project is rejected |

### getAppliedProject
<dl>
<dt>path: '/applied/all'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| None | None | None |

**Return**: All projects are not deletes

------

### getAppliedProjectPagination
<dl>
<dt>path: '/applied?page=:page&limit=:limit'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| page | <code>Interger</code> | current page  |
| limit | <code>Interger</code> | Maximum item in 1 page |

**Return**: all projects that meet the pagination criteria

------

### getAppliedProjectById
<dl>
<dt>path: '/applied/:id'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| id | <code>Interger</code> | ID of applied project will be get  |

**Return**: project is not deletes

------

### updateAppliedProject
<dl>
<dt>path: '/applied/:id/update'</dt>
<dd><p>Method: PATCH</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| id | <code>Interger</code> | ID of applied project will be updated  |

| Body | Type | Description |
| --- | :---: |  --- |
| project | <code>Appiled Project</code> | project's information to change |

------

### deleteProject
<dl>
<dt>path: '/applied/:id/delete'</dt>
<dd><p>Method: DELETE</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| id | <code>Interger</code> | ID of applied project will be deleted  |

------

### createAppliedProject
<dl>
<dt>path: '/applied/create'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| PersonalName | <code>String</code> | Project's owner name |
| PersonalEmail | <code>String</code> | Project's owner mail |
| PersonalTelegram | <code>String</code> | Project's onwer telegram |
| ProjectName | <code>String</code> | Project's name |
| Description | <code>Text</code> | short description about project |
| Website | <code>String</code> | Link to project website |
| Twitter | <code>String</code> | Project's twitter |
| Telegram | <code>String</code> | Project's telegram |
| ChainId | <code>Interger</code> | Chain of project |
| DevelopmentState | <code>String</code> | state of project development |
| Whitepaper | <code>String</code> | Project's whitepaper |
| Tokenomic | <code>String</code> | Project's tokenomic |
| BeforeRaise | <code>Text</code> | where project has raised before |
| TotalRaise | <code>Interger</code> | Total money project has raised before  |

------

### getDevelopmentState
<dl>
<dt>path: '/applied/development-state'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| None | None | None |

| Body | Type | Description |
| --- | :---: |  --- |
| None | None | None |

**Return**: 

| Name | Type | Define |
| --- | :---: |  --- |
| IDEA | <code>String</code> | Just an initial idea |
| WHITEPAPER | <code>String</code> | Idea with whitepaper |
| DEVELOPMENT | <code>String</code> | In development |
| READY | <code>String</code> | Ready to launch |
| MVP | <code>String</code> | MVP live |
| TESTNET | <code>String</code> | Testnet |
| MAINNET | <code>String</code> | Mainnet |

------

### getStatus
<dl>
<dt>path: '/applied/status'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| None | None | None |

| Body | Type | Description |
| --- | :---: |  --- |
| None | None | None |

**Return**: 

| Name | Type | Define |
| --- | :---: |  --- |
| NEW | <code>String</code> | new |
| PROCESS | <code>String</code> | process |
| APPROVE | <code>String</code> | approve |
| REFUSE | <code>String</code> | refuse |

------

### exportAppliedProjectAsXlsx
<dl>
<dt>path: '/applied/export'</dt>
<dd><p>Method: GET</p></dd>
</dl>

**Return**: Datas.xlsx file

------

## Pool projects
<dl>
<dt>path: '/api/pool'</dt>
<dt>Type: Pool</dt>
</dl>

| Field | Type | Description |
| --- | :---: |  --- |
| Id | <code>String</code> | Pool ID (yi-1) |
| PoolAddress | <code>String</code> | Pool's pool address |
| Name | <code>String</code> | Pool's name (Yi 1)|
| Description | <code>Text</code> | short description about Pool |
| Website | <code>String</code> | Link to pool website |
| Whitepaper | <code>String</code> | Pool's whitepaper |
| Twitter | <code>String</code> | Pool's twitter |
| IsPublic | <code>Integer</code> | Public or private (1: public, 0: private) |
| TokenAddress | <code>String</code> | Pool's token address |
| OwnerAddress | <code>String</code> | Pool's owner address |
| LogoUrl | <code>String</code> | Pool's logo |
| BeginTime | <code>Integer</code> | Pool's begin time |
| EndTime | <code>Integer</code> | Pool's end time |
| MoneyRaise | <code>Integer</code> | Pool's money raise |
| ChainId | <code>Interger</code> | Chain of pool |


### getPools
<dl>
<dt>path: '/pool/all'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| None | None | None |

| Body | Type | Description |
| --- | :---: |  --- |
| None | None | None |

**Return**: All pools are in the system

------

### getPoolsPagination
<dl>
<dt>path: '/pool?page=:page&limit=:limit'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| page | <code>Interger</code> | current page  |
| limit | <code>Interger</code> | Maximum item in 1 page |

**Return**: all pools that meet the pagination criteria

------

### getPoolById
<dl>
<dt>path: '/pool/:id/'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| id | <code>Interger</code> | ID of applied project will be deleted  |

| Body | Type | Description |
| --- | :---: |  --- |
| None | None | None |

**Return**: All details of a pool by Id

------

### createPool
<dl>
<dt>path: '/pool/create'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| None | None | None |

| Body | Type | Description |
| --- | :---: |  --- |
| AppliedProjectId | <code>Interger</code> | ID of applied project will be deployed (used to update the status from "NEW" to "APPROVE") |
| PoolAddress | <code>String</code> | Pool's pool address |
| ProjectName | <code>String</code> | Pool's name |
| Description | <code>Text</code> | short description about Pool |
| Website | <code>String</code> | Link to pool website |
| Whitepaper | <code>String</code> | Pool's whitepaper |
| Twitter | <code>String</code> | Pool's twitter |
| IsPublic | <code>Integer</code> | Public or private (1: public, 0: private) |
| TokenAddress | <code>String</code> | Pool's token address |
| OwnerAddress | <code>String</code> | Pool's owner address |
| SignerAddress | <code>String</code> | Pool's signer address |
| LogoUrl | <code>String</code> | Pool's logo |
| BeginTime | <code>Integer</code> | Pool's begin time |
| EndTime | <code>Integer</code> | Pool's end time |
| MoneyRaise | <code>Integer</code> | Pool's money raise |
| ChainId | <code>Interger</code> | Chain of pool |
| WhitelistBegin | <code>Integer</code> | When Whitelist starts |
| WhitelistEnd | <code>Interger</code> | When Whitelist ends |

------

## Users
<dl>
<dt>path: '/api/user'</dt>
<dt>Type: User</dt>
</dl>

| Field | Type | Description |
| --- | :---: |  --- |
| Id | <code>String</code> | Pool ID (yi-1) |
| Address | <code>String</code> | User's address |
| Email | <code>String</code> | User's email|

------

### getUsersPagination
<dl>
<dt>path: '/user?page=:page&limit=:limit'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| page | <code>Interger</code> | current page  |
| limit | <code>Interger</code> | Maximum item in 1 page |

**Return**: all users that meet the pagination criteria

------

### sendConfirmKYCEmail
<dl>
<dt>path: '/user/sendConfirmKYCEmail'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Body | Type | Description |
| --- | :---: |  --- |
| emails | <code>List<email></code> | List of mails to send  |

**Return**: List of invalid emails
  
------

### createUsers
<dl>
<dt>path: '/user/create'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Body | Type | Description |
| --- | :---: |  --- |
| Users | <code>Array</code> | array of users (each Object user has: Address, Email)  |

------

## Whitelist
<dl>
<dt>path: '/api/whitelist'</dt>
<dt>Type: Whitelist</dt>
</dl>

| Field | Type | Description |
| --- | :---: |  --- |
| PoolAddress | <code>String</code> | Pool's pool address |
| UserAddress | <code>String</code> | User's address |
| MaxAmount | <code>INTEGER</code> | Maximum number of tokens a user can buy |
| Status | <code>String</code> | Pending - Approve - Denied |

------

### getWhitelistPagination
<dl>
<dt>path: '/validUser?poolAddress=:poolAddress'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| poolAddress | <code>String</code> | Pool's pool address |

**Return**: 
| Field | Type | Description |
| --- | :---: |  --- |
| Users | <code>INTEGER</code> | All users join whitelist (valid and invalid users) |
| ValidUsers | <code>INTEGER</code> | Valid users who can be added to whitelist |
| WhitelistedUsers | <code>INTEGER</code> | The users has been added to the whitelist |
| WhitelistBegin | <code>Integer</code> | When Whitelist starts |
| WhitelistEnd | <code>Interger</code> | When Whitelist ends |

------

### getValidUserPagination
<dl>
<dt>path: '/validUser?poolAddress=:poolAddress&page=:page&limit=:limit'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| poolAddress | <code>String</code> | Pool's pool address |
| page | <code>Interger</code> | current page  |
| limit | <code>Interger</code> | Maximum item in 1 page |

**Return**: all valid users that meet the pagination criteria and they can be added whitelist

------

### getInvalidUserPagination
<dl>
<dt>path: '/invalidUser?poolAddress=:poolAddress&page=:page&limit=:limit'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| poolAddress | <code>String</code> | Pool's pool address |
| page | <code>Interger</code> | current page  |
| limit | <code>Interger</code> | Maximum item in 1 page |

**Return**: all invalid users that meet the pagination criteria and they don't KYC

------

### getAllUserPagination
<dl>
<dt>path: '/allUser?poolAddress=:poolAddress&page=:page&limit=:limit'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| poolAddress | <code>String</code> | Pool's pool address |
| page | <code>Interger</code> | current page  |
| limit | <code>Interger</code> | Maximum item in 1 page |

**Return**: all users that meet the pagination criteria including KYC and non-KYC

------

### registerWhitelist
<dl>
<dt>path: '/register'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| PoolAddress | <code>String</code> | Pool's pool address |
| UserAddress | <code>String</code> | User's address |

------

### updateWhitelist
<dl>
<dt>path: '/setWhitelist'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| PoolAddress | <code>String</code> | Pool's pool address |
| Whitelist | <code>Array</code> | list of users and their MaxAmount  |

------

### addUserToWhiteList
<dl>
<dt>path: '/addUserToWhiteList/:PoolAddress'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| PoolAddress | <code>String</code> | Pool's address |

| Body | Type | Description |
| --- | :---: |  --- |
| UserAddress | <code>String</code> | User's address |

------

### importWhitelist
<dl>
<dt>path: '/importWhitelist/:PoolAddress'</dt>
<dd><p>Method: POST</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| PoolAddress | <code>String</code> | Pool's address |

| File | Type | Description |
| --- | :---: |  --- |
| file | <code>File</code> | File uploaded |

------

### exportWhitelistTemplate
<dl>
<dt>path: '/exportWhitelistTemplate'</dt>
<dd><p>Method: GET</p></dd>
</dl>

**Return**: Template file

------

## Admins
<dl>
<dt>path: '/api/'</dt>
<dt>Type: Admin</dt>
</dl>

| Field | Type | Description |
| --- | :---: |  --- |
| Username | <code>String</code> | Username of admin |
| Name | <code>String</code> | Admin's fullname |
| Password | <code>String</code> | Admin's Password|
| IsDeleted | <code>Boolean</code> | Is admin banned|

------

### changePassword
<dl>
<dt>path: '/changePassword'</dt>
<dd><p>Method: PATCH</p></dd>
</dl>

| Body | Type | Description |
| --- | :---: |  --- |
| username | <code>String</code> | admin's username |
| oldPassword | <code>String</code> | admin's old password |
| confirmPassword | <code>String</code> | admin's old password for confirm |
| newPassword | <code>String</code> | admin's new password |

------

### getAdmin
<dl>
<dt>path: '/admins/:username'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Param | Type | Description |
| --- | :---: |  --- |
| username | <code>String</code> | admin's username |

------

### createAdmin
<dl>
<dt>path: '/admins/:username'</dt>
<dd><p>Method: GET</p></dd>
</dl>

| Body | Type | Description |
| --- | :---: |  --- |
| username | <code>String</code> | admin's username |
| name | <code>String</code> | Admin's fullname |
| password | <code>String</code> | Admin's Password|

------

### banAdmin
<dl>
<dt>path: '/banAdmin'</dt>
<dd><p>Method: DELETE</p></dd>
</dl>

| Body | Type | Description |
| --- | :---: |  --- |
| username | <code>String</code> | admin's username |

------

### unbanAdmin
<dl>
<dt>path: '/unbanAdmin'</dt>
<dd><p>Method: DELETE</p></dd>
</dl>

| Body | Type | Description |
| --- | :---: |  --- |
| username | <code>String</code> | admin's username |

------

### resetPassword
<dl>
<dt>path: '/unbanAdmin'</dt>
<dd><p>Method: PATCH</p></dd>
</dl>

| Body | Type | Description |
| --- | :---: |  --- |
| username | <code>String</code> | admin's username which reset passqord |
| superAdminPassword | <code>String</code> | super Admin's Password to confirm|

------

### updateAdmin
<dl>
<dt>path: '/updateAdmin'</dt>
<dd><p>Method: PATCH</p></dd>
</dl>

| Body | Type | Description |
| --- | :---: |  --- |
| username | <code>String</code> | admin's username which update |
| name | <code>String</code> | admin's name for update|

------

### getAdminList
<dl>
<dt>path: '/getAdminList?page=:page&limit=:limit'</dt>
<dd><p>Method: GET</p></dd>
</dl>

**Return**: all admin that meet the pagination criteria