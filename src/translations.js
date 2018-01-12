// add some translations (could also be loaded from a separate file)
// note that it is possible to use placeholders. translations can also be
// structured as object trees and will automatically be flattened by the the
// plugin
const translationsEn = {
    about:"About AnyOneBook",
    shop:"Pagin'Book Store",
    confirm_remove_page:"Are you sure to remove, {domain} - {area} on page {page}?"
};

// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
const translationsTc = {
    "Privacy Policy":"私隱政策",
    "Legal Notice":"服務條款",
    "about":"關於AnyOneBook",
    "shop":"選頁書店",
    "Tasks":"工作清單",
    confirm_remove_page:"你確認要刪除在第 {page} 頁上的{domain} - {area} 嗎?",
    "Delete":"刪除",
    "Cancel":"取消",
    "User Email":"使用者Email",
    "Password":"用戶密碼",
    "Password is required":"必須填寫用戶密碼",

    "Logout":"登出",
    "AnyOneBook Login":"AnyOneBook 登入",
    "E-mail must be valid":"無效Email ",

    //Button Label
    "Add":"新增",
    "Edit":"修改",
    "Close":"關閉",
    "Submit":"提交",
    "Login":"登入",
    "Select":"選擇",

    Home:"首頁",
    UploadPage:"上載頁面",
    SearchPage:"找尋頁面",
    CreateBook:"創建選頁書",
    "Search Books":"找尋選頁書",
    UserProfile:"用戶資料",
    OrderManagement:"訂單管理",

    "Page Information":"頁面資料",

    "Page Preview":"預覽",

    "Affiliation":"相聯出版物",

    "version":"版本",

    "Link Previous Page":"連結上一頁",

    "indicates required field":"必須填寫",

    "Please fill page information before upload":"上載前請先填寫頁面資料",
    'Please fill in information of this version before upload':"上載前請先填寫此版本資料",


    "其他":"其他詞語"

};


export {
    translationsEn,
    translationsTc
};
