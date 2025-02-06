
import { Clock, PlayCircle, Plus } from 'lucide-react'
import { Button } from './ui/Button'

export default function LeftSidebar() {


  return (
    <div className="w-70 border-r border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm">
      <nav className="space-y-4">
        <div className="rounded-lg bg-gray-800/50 p-4 flex flex-col items-center">
          <Button className='text-lg text-white font-bold text-center'>LOGO</Button>
        </div>
        <div className="rounded-lg bg-gray-800/50 p-4 flex flex-col items-center">
          <Button className='text-lg text-white font-bold text-center'>LOGIN</Button>
        </div>
        <div className="rounded-lg bg-gray-800/50 p-4">
          <h1 className="mb-2 font-semibold text-gray-400">Последние действия</h1>
          <div className="space-y-2">
            <Button  className='flex text-lg items-center'>
              <Clock className="mr-2 h-4 w-4" size={20} />
              Последние пополнения
            </Button>
            <Button className='flex text-lg items-center'>
              <PlayCircle className="mr-2 h-4 w-4" size={20} />
              Последние снятия
            </Button>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800/50 p-4 flex flex-col items-center">
          <p className='text-lg text-white font-bold text-center'>Завершаются</p>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4">
          <h1 className="mb-2 font-semibold text-gray-400">New</h1>
          <Button  className='flex text-lg items-center'>
            <Plus className="mr-2 h-4 w-4" size={20} />
            Новые
          </Button>
        </div>
      </nav>
    </div>
  )
}

