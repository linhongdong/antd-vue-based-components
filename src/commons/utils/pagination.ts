/**
 *
 * @param form 表单项
 * @param callback
 * @returns
 */
export function getPagination(form: any = {}, callback: Function) {
    // 如果不存在就给个默认值吧
    form.current = form.current || 1;
    form.size = form.size || 10;
    const pagination = {
        // defaultCurrent: form.current, // 默认当前页数
        // defaultPageSize: form.size, // 默认当前页显示数据的大小
        current: form.current, // 默认当前页数
        pageSize: form.size, // 默认当前页显示数据的大小
        total: 0, // 总数
        showSizeChanger: true,
        showQuickJumper: true,
        // pageSizeOptions: ['5', '10', '15', '20'],
        showTotal: (total: string) => `共 ${total} 条`, // 显示总数
        // pageSize 变化的回调
        onShowSizeChange: (current: number, pageSize: number) => {
            pagination.pageSize = pageSize;
            form.size = pageSize;
            form.current = current;
            pagination.current = current;
            callback(form);
        },
        // 页码改变的回调，参数是改变后的页码及每页条数
        onChange: (current: number, size: number) => {
            pagination.pageSize = size;
            form.size = size;
            form.current = current;
            pagination.current = current;
            callback(form);
        },
    };
    return pagination;
}
