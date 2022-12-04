const filterObj = (obj, user, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) {
            if (el === "bookIssued") {
                if (obj[el].isRenewed && obj[el].checkId) {
                    let data = user.bookIssued.filter(
                        (e) => e.bookId === obj[el].checkId
                    );
                    let date = new Date(+data[0].returnDate + 7 * 24 * 60 * 60 * 1000);
                    data[0].returnDate = date;
                    data[0].isRenewed = true;
                    let newVal = data[0];
                    for (let i = 0; i < user.bookIssued.length; i++) {

                        if (user.bookIssued[i].bookId === obj[el].checkId) {
                            user.bookIssued[i] = newVal;
                            console.log(user.bookIssued);
                            newObj["bookIssued"] = user.bookIssued;
                        }
                    }
                } else {
                    let id = obj[el].bookId.split(" ")[1];
                    if (id) {
                        let data = user.bookIssued.filter((e) => e.bookId !== id);
                        newObj[el] = data;
                    } else {
                        newObj[el] = [...user.bookIssued, obj[el]];
                    }
                }
            } else {
                newObj[el] = obj[el];
            }
        }
    });
    return newObj;
};

module.exports = filterObj