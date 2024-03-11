export const handleResp = (
    RESPONSE,
    STATUS_CODE,
    MESSAGE,
    DATA = {},
) => {

    return RESPONSE
        .status(STATUS_CODE)
        .send({
            message: MESSAGE,
            data: DATA
        })

};

export const handleError = (error) => {
    console.error({error})
    throw Error(error);
}

export const handleExpection = (next, error) => {
    console.error({error})
    next(error);
}

export const catchError = (ACTION) => {

    try {
        ACTION
    } catch (error) {
        handleError(error)
    }

}

export const paginatedResults = (
    PAGE = 1,
    LIMIT = 10,
) => {
    console.log({ PAGE, LIMIT })
    const formatPage = Number(PAGE);
    const formatLimit = Number(LIMIT);
    const skips = (formatPage - 1) * formatLimit;

    return {skips, formatLimit};
}

const roundLastDay = (date) => {
    if (!date) return new Date();
    const new_date = new Date(date);
    let day = new_date.getDate();
    let month = new_date.getMonth() + 1;
    let year = new_date.getFullYear();

    if ((month === (11 || 5 || 7 || 12) && day < 30) || day < 31) {
        day += 1;
    }
    if (month === 3 && day < 28) {
        day += 1;
    }
    return `${month}/${day}/${year}`;
}

export const formatDate = (START_DATE, END_DATE) => {
    console.log({START_DATE, END_DATE})
    if (START_DATE && END_DATE) {
        const formatStartDate = new Date(START_DATE);
        const normalEndDate = new Date(END_DATE);
        const formatEndDate = new Date(roundLastDay(normalEndDate));
        return { formatStartDate, formatEndDate }
    }

    return { formatStartDate: false, formatEndDate: false };

}
