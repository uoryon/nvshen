####本文檔作爲路由函數的說明記錄版本

\- 2013.6.29 把路由函數從index.js分離出兩類us.js(user), ns.js(nvshen)
  因爲文件就是這樣寫的


- index.js 作爲模塊輸出
  - 引用的模塊
   - (尚無)

- us.js 用於有關用戶的行爲和基本路徑路由
  - 引用的模塊
    - crypto 加密
    - User 服務器用戶模型
  - '/' 根目錄 `GET`
  - '/login' 登錄, 調用User.login, 成功後將對象存入req.session `GET`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
    - 接受格式:
      {
        uname:,
        password
      }
  - '/logout' 登出, 清空req.session.user `GET|POST`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
  - '/signup' 註冊, 調用User.exist 後, 使用user.save `POST`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
      - 2 用戶名已存在
    - 接受格式:
      {
        uname:,
        password:,
        ch:{
          nick:,
          email:,
        }
      }
  - '/update' 更新用戶信息, ch內容, 調用user.update `POST`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
  - '/uphead' 更新用戶頭像, 調用user.uphead `POST`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
      - 2 圖片存儲失敗
  - '/chpass' 修改密碼, 調用user.chpass `POST`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
      - 2 密碼錯誤

- ns.js 用於有關女孩的行爲
  - 引用的模塊
    - nvshen 服務器女孩模型
  - '/upGirl' 添加女孩 `POST`
    - 返回值:
      - 0 成功
      - 1 網絡或數據等庫問題
      - 2 失敗, 已經存在女孩
  - '/hg' 操作好感, 先Nvshen.get後, 使用nvshen.hg `POST`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
      - 2 今日已操作
  - '/up' 對女神上傳圖片, 先Nvshen.get後, 使用nvshen.up `POST`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
      - 2 圖片存儲失敗
  - '/sp' 對女生添加說的話, 先Nvshen.get後, 使用nvshen.sp `POST`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
  - '/gg' 獲得女生的圖片, 先Nvshen.get後, 使用nvshen.gg `GET`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
  - '/gp' 獲得對女生的說話, Nvshen.gp `GET`
    - 返回值:
      - 0 成功
      - 1 網絡失敗
  - '/ga' 獲得當前用戶添加過的所有女生, Nvshen.ga `GET`
    - 返回值:
      - 0 成功
      - 1 網絡錯誤
      - 2 沒有女孩
