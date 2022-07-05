window.onerror = function(
    errorMessage,
    scriptURI,
    lineNumber,
    columnNumber,
    error
) {
    if (error) {
        // 向控制台或全局事件處理程序報告錯誤，模擬未捕獲的 JavaScript 異常。
        reportError(error);
    } else {
        reportError({
            message: errorMessage,
            script: scriptURI,
            line: lineNumber,
            column: columnNumber
        });
    }
}