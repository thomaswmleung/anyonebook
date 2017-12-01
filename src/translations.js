// add some translations (could also be loaded from a separate file)
// note that it is possible to use placeholders. translations can also be
// structured as object trees and will automatically be flattened by the the
// plugin
const translationsEn = {
    "about":"About AnyOneBook",
    "shop":"Pagin'Book Store"
};

// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
const translationsTc = {
    "about":"關於AnyOneBook",
    "shop":"選頁書店", 
    "Task":"工作清單",
};


export {
    translationsEn,
    translationsTc
};