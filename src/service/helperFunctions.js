export const convertStringToObject = (searchQuery) => {

    try {

        if (!!searchQuery) {

            var search = (searchQuery).substring(1);

            let obj = JSON.parse('{"' + search.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

            return {
                filter: '',
                search: '',
                page: 1,
                field: '',
                orderBy: '',
                ...obj
            }

        }

        return {
            search: '',
            page: 1,
            field: '',
            orderBy: '',
            filter: '',
        }


    } catch (error) {
        console.log(error, 'd4sds4d')
    }

}