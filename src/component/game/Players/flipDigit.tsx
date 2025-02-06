import './gameRoom.css';

const FlippingNumbers = () => {
  
  return (
    <div className="flipping-numbers">
        <div  className="digit">
          <div className="container">
  <div className="nums nums-ten">
    <div className="num" data-num="0" data-num-next="1"></div>
    <div className="num" data-num="1" data-num-next="2"></div>
    <div className="num" data-num="2" data-num-next="3"></div>
    <div className="num" data-num="3" data-num-next="4"></div>
    <div className="num" data-num="4" data-num-next="5"></div>
    <div className="num" data-num="5" data-num-next="6"></div>
    <div className="num" data-num="6" data-num-next="7"></div>
    <div className="num" data-num="7" data-num-next="8"></div>
    <div className="num" data-num="8" data-num-next="9"></div>
    <div className="num" data-num="9" data-num-next="0"></div>
  </div>
  </div>
</div>
    </div>
  );
};

export default FlippingNumbers;
