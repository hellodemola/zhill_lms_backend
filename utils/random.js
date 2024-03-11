function get_random(list = []) {
    if (list.length > 0) {
        const shuffled = list.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 10);
        let random_list = selected;
        return random_list;
    }
    return list;
}


export { get_random }
