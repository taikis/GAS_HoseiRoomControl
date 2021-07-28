function getPlaceName() {
  var name=[
    "部室",
    "ミーティングA",
    "ミーティングB"
  ]
}

function getNote7(){
  return "全時間帯において、6名を超えないように配慮した。\n"+
  "長期的に離席していた場合、最終的に帰宅した時を記録しているため、見かけ上定員を超えていることがあり得る。"
}

class DataForA {
  constructor() {
    this.num = 0;
    this.startTime = 0;
    this.finishTime = 0;
    this.chiefName = undefined;
  }
  setStartTime(time) {
    if (time < this.startTime || (!this.startTime)) {
      this.startTime = time;
    }
  }
  setEndTime(time) {
    if ((time > this.finishTime) || this.finishTime == 0) {
      this.finishTime = time;
    }
  }
  setChiefName(name){
    this.chiefName = name;
  }
}
