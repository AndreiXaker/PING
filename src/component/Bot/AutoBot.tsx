// import { useState } from 'react';
// import { Modal, Button, Select, message } from 'antd';
// import { usersGame } from '../../api/api';


// const { Option } = Select;

// interface AutoBotModalProps {
//   visible: boolean;
//   onClose: () => void;
//   gameId: string;
//   sessionId: number;
//   coinSymbol: string;
//   betAmount: number;
// }

// const schedule = {
//   '3': {
//     times: ['00:00–01:00', '01:00–02:00', '02:00–03:00','17:00–18:00'],
//     maxCell: 3,
//   },
//   '6': {
//     times: ['00:00–03:00', '03:00–06:00', '06:00–09:00'],
//     maxCell: 6,
//   },
//   '9': {
//     times: ['00:00–06:00', '06:00–12:00', '12:00–18:00'],
//     maxCell: 9,
//   },
// };

// export default function AutoBotModal({ visible, onClose, betAmount,sessionId, coinSymbol, gameId }: AutoBotModalProps) {
//   const [mode, setMode] = useState<'3' | '6' | '9'>('3');
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [selectedCell, setSelectedCell] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleStart = () => {
//   if (!selectedTime || !selectedCell) {
//     message.warning('Выберите ячейку и время');
//     return;
//   }

//   const [fromTime, toTime] = selectedTime.split('–');
//   const [fromHour, fromMinute] = fromTime.split(':').map(Number);
//   const [toHour, toMinute] = toTime.split(':').map(Number);

//   const now = new Date();

//   // Время начала и конца интервала сегодня
//   const targetFrom = new Date(now);
//   targetFrom.setHours(fromHour, fromMinute, 0, 0);

//   const targetTo = new Date(now);
//   targetTo.setHours(toHour, toMinute, 0, 0);

//   let msUntilTarget;

//   if (now >= targetFrom && now <= targetTo) {
//     // Сейчас внутри выбранного интервала — запускаем сразу
//     msUntilTarget = 0;
//   } else {
//     // Если интервал уже прошёл — переносим на следующий день
//     if (targetFrom < now) {
//       targetFrom.setDate(targetFrom.getDate() + 1);
//     }
//     msUntilTarget = targetFrom.getTime() - now.getTime();
//   }

//   const launchTimeText = new Date(now.getTime() + msUntilTarget).toLocaleTimeString();

//   setIsLoading(true);
//   message.success(`Автоставка запланирована на ${launchTimeText}`);

//   setTimeout(async () => {
//     try {
//       const maxBets = 10;        // Максимальное количество ставок
//       const delayBetweenBets = 3000; // Пауза между ставками в миллисекундах (3 секунды)

//       for (let i = 0; i < maxBets; i++) {
//         await usersGame(gameId, {
//           cell_numbers: [selectedCell],
//           bet_amount: betAmount,
//           session_id: sessionId,
//           coin_symbol: coinSymbol,
//         });
//         message.info(`Сделана ставка №${i + 1}`);

        
//         if (i !== maxBets - 1) {
//           await new Promise((resolve) => setTimeout(resolve, delayBetweenBets));
//         }
//       }
//       message.success('Автоставка завершена!');
//     } catch (err) {
//       console.error(err);
//       message.error('Ошибка при автоставке');
//     } finally {
//       setIsLoading(false);
//       onClose();
//     }
//   }, msUntilTarget);
// };


//   return (
//     <Modal title="Настройка автобота" open={visible} onCancel={onClose} footer={null}>
//       <div className="space-y-4">
//         <div>
//           <p>Выберите игру:</p>
//           <Select
//             value={mode}
//             onChange={(val) => {
//               setMode(val);
//               setSelectedTime(null);
//               setSelectedCell(null);
//             }}
//             style={{ width: '100%' }}
//           >
//             <Option value="3">3 ячейки</Option>
//             <Option value="6">6 ячеек</Option>
//             <Option value="9">9 ячеек</Option>
//           </Select>
//         </div>

//         <div>
//           <p>Выберите временной слот:</p>
//           <Select
//             value={selectedTime}
//             onChange={setSelectedTime}
//             style={{ width: '100%' }}
//             placeholder="Выберите время"
//           >
//             {schedule[mode].times.map((time) => (
//               <Option key={time} value={time}>
//                 {time}
//               </Option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <p>Выберите ячейку (от 1 до {schedule[mode].maxCell}):</p>
//           <Select
//             value={selectedCell}
//             onChange={setSelectedCell}
//             style={{ width: '100%' }}
//             placeholder="Выберите номер ячейки"
//           >
//             {Array.from({ length: schedule[mode].maxCell }, (_, i) => i + 1).map((num) => (
//               <Option key={num} value={num}>
//                 Ячейка №{num}
//               </Option>
//             ))}
//           </Select>
//         </div>

//         <Button
//           type="primary"
//           onClick={handleStart}
//           block
//           loading={isLoading}
//         >
//           🚀 Запланировать автоставку
//         </Button>
//       </div>
//     </Modal>
//   );
// }
