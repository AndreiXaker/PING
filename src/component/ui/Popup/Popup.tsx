import React from "react";
import './popup.css';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        id="roadmap-container"
        className="roadmap-container bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-4xl"
      >
        <div className="roadmap-auto">
          <h2 className="roadmap-h2 text-center">Roadmap</h2>
          <div className="spacer-block">&nbsp;</div>
          <div className="roadmap-timeline">
            <div className="timeline-dot">&nbsp;</div>
            <div className="timeline-list">
              <div className="timeline-list-vr">&nbsp;</div>

              {/* Левая колонка таймлайна */}
              <div className="timeline-list-col timeline-col-left">
                <div className="timeline-item-block timeline-item-block-green">
                  <div className="timeline-item-time">
                    <div className="timeline-item-label">2016&nbsp;</div>
                  </div>
                  <div className="timeline-item-label-hr">
                    <div className="item-dot timeline-dot">&nbsp;</div>
                  </div>
                  <div className="timeline-item-label2">Starting Up</div>
                  <div className="timeline-item-content">
                    <p>Research on aviation market</p>
                    <p>Research on cryptocurrency</p>
                    <p>Research on traditional online payment system & alternative payment solution</p>
                  </div>
                </div>
              </div>

              {/* Правая колонка таймлайна */}
              <div className="timeline-list-col timeline-col-right">
                <div className="timeline-item-block timeline-item-block-violet">
                  <div className="timeline-item-time">
                    <div className="timeline-item-label">2017 Q1</div>
                  </div>
                  <div className="timeline-item-label-hr">
                    <div className="item-dot timeline-dot">&nbsp;</div>
                  </div>
                  <div className="timeline-item-label2">
                    Building Up And Getting Real Experiences
                  </div>
                  <div className="timeline-item-content">
                    <p>Integrate Bitair payment solution into real business network regarding booking airline ticket (trial version) to conduct research</p>
                    <p>Make survey of user's experiences & choices</p>
                    <p>Approach airlines, travel & tourism agencies regarding a new, fast, cheap, reliable payment method.</p>
                    <p>Develop application iOS and Android</p>
                  </div>
                </div>
              </div>

              {/* Кнопка закрытия */}
              <button
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2"
                onClick={onClose}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
