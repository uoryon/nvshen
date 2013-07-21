###服務端對象

####User類

- User構造函數:

> 提供依據數據庫文檔項的初始化

- 構造:
  - uname 用戶名字
  - password md5 base64的密碼
  - head 頭像存儲位置
  - ch 用戶的可變設置
    - nick 昵稱
    - birthday 生日
    - email 郵箱
  -unch 不可修改的內容
    - regtime 註冊時間
- 實例方法:
  - save: function(callback) 將內容存儲至數據庫, 回調函數返回(err[, user])
  - update: function(user, och, callback) 直接替換對象中ch的內容.
  - uphead: function(picurl,callback) 調用pic的方法把圖片存入文件系統
  - chpass: function(user, newpass, callback) 直接修改密碼
- 類方法:
  - exist: function(callback) 依據提供的username, 返回文檔對象(err[, user|null])
  - login: function(user, callback) 核對數據庫中的用戶名和密碼, 確認身份.



####Nvshen類

- Nvshen構造函數:

> 提供插入到數據庫內容的初始化

- 構造:
  - uname 由創造她的用戶指定
  - head 保存的頭像
  - gname 使用的名字
  - descri 描述, 可以留空
  - like 目前好感度
  - plike 增加好感的係數(默認1)
  - 好感度計算方法, 如果持續的添加這個女神的好感, 她的好感係數單位將持續的增加,
  每次上次增加20%, like+=plike, and maintain its value at every night
  use corn

- 實例方法:
  - add: function(username, callback) 將女孩插入user的文檔結構裏面, 回調函數返回(err[, girl])
  - hg: function(tf, callback) tf = type, hg = haogan , 處理好感的函數
  - up: function(odata, callback) 調用pic, 把女生頭像存入文件系統
  - gg: function(callback) gg = get gallery 獲得相冊圖片
  - sp: function(odata, callback) speaktoher 寫入speak
- 類方法:
  - exist: function(username, girlname, callback) 查找是否存在
  - get: function(username, girlname, callback) 依據user, 取出特定女孩的詳細內容, 回調函數返回(err[, girl]);
  - getAll: function(username, callback) 依據user, 取出所有女孩簡單信息, 回調函數返回(err[, girls]);
  - gp: function(username, girlname, start, callback) 獲取get speak, start是限制

####Pic類

- Pic構造函數

> 提供文件的保存

- 構造
  - pic 存儲圖片編碼

- 實例方法
  - save: function(dirdir, callback)將上傳的圖片寫入dirdir目錄中





###客戶端對象

- 前臺不存儲信息

####Me類

- 用作通信,不存儲信息

- 實例方法:
  - update: function(odata) 向'./update'POST數據, 目的:更新用戶可修改信息
  - uphead: function(odata) 向'./uphead'POST數據, 目的:更新用戶頭像
  - chpass: function(odata) 向'./chapss'POST數據, 目的:修改用戶密碼
  - login: function(udata) 向'./login'POST數據, 目的:登錄
  - signup: function(udata) 向'./signup'POST數據, 目的: 註冊



####Girl類

- 也用作通信, 不存儲信息

- 實例方法:
  - fill:function(odata) 向'./upGirl'POST數據, 目的: 添加女孩
  - hg: function(odata) 向'./hg'POST數據, 目的: 操作好感, tf3個狀態
  - up: function(odata) 向'./up'POST數據, 目的: 上傳女生相片
  - sp: function(odata) 向'./sp'POST數據, 目的: 添加對她說的話
  - gg: function(odata) 向'./gg'POST數據, 目的: 獲取已經上傳的圖片
  - gp: function(odata) 向'./gp'POST數據, 目的: 獲取已經說過的話
