const ExtObj: any = {
    '37 80 68 70': '.pdf',
    '-1 -40 -1 -32': '.jpg',
    '-119 80 78 71': '.png',
};
Object.freeze(ExtObj);
/**
 * 获取文件扩展名
 * @param flag 文件标识
 * @returns 文件扩展名
 */
export function getFileExt(key: string) {
    return ExtObj[key] || '.txt';
}
