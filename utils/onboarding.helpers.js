// Instead of waiting on is the last personInstead of waiting on is the last personimport bcrypt from 'bcrypt';

// hash a password
export const hash_password = async (password) => {
    const saltRounds = 10;
    const hash = bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return console.log({ err })
        console.log({ hash })
        return hash;
    })
    return hash;
}

// retrive a password
export const comparePassword = (password) => {
    return bcrypt.compare(password, hash, (err, result) => {
        if (err) return null;
        return result
    })
}

export const isExpired = async (date) => {
    const currentTime = new Date();
    const tokenDate = new Date(date)
    if (currentTime > tokenDate) return true;
    return false;
}
