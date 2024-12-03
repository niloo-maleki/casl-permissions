import { cn, IconSettingLineLight } from '@shatel/ui-kit'
import { useState } from 'react';
import OperationMedal from './OperationMedal';

const ActionButton = () => {
  const [openModal, setOpenModal] = useState(false);

  const handlerClick = (() => {
    setOpenModal(true)
  })

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex gap-medium items-center'>
        <IconSettingLineLight className={cn("fill-main-brand-primary stroke-main-brand-primary cursor-pointer")} onClick={() => handlerClick()} />
        <OperationMedal open={openModal} setOpenModal={setOpenModal} />

      </div>
    </div>
  )
}

export default ActionButton