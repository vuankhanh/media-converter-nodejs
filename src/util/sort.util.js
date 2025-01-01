class SortUtil {
  static sortArray(array) {
    return array.sort((a, b)=>{
      if (a.originalname < b.originalname) return -1;
      if (a.originalname > b.originalname) return 1;
      return 0;
    });
  }
}

module.exports = SortUtil;