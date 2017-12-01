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
    "about":"關於AnyOneBook",
    "shop":"選頁書店", 
    "Task":"工作清單",
    confirm_remove_page:"你確認要在第 {page} 頁上的{domain} - {area} 嗎?", 
    "Delete":"刪除", 
    "Cancel":"取消"
};


export {
    translationsEn,
    translationsTc
};