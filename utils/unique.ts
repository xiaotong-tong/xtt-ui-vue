/**
 * 获取一个自增的唯一的数字
 * @returns {number}
 */
export const uniqueNumber = () => {
	return uniqueNumber.uId++;
};
uniqueNumber.uId = 0;
