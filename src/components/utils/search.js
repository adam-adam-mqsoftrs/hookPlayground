

export function SrcUser(nameList, userNameList, search, i) {
    if (nameList.slice(0, 2) === search?.toLowerCase() || nameList === search?.toLowerCase()) {
        return i
    }
    else if (userNameList.slice(0, 2) === search?.toLowerCase() || userNameList === search?.toLowerCase()) {
        return i
    }
    else
        return null
}