import React from 'react';
import { SharedOrderTask, UserRole } from './types';
import { FaShieldAlt, FaBoxOpen, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';

interface CommandRoomProps {
  tasks: SharedOrderTask[];
  currentRole: UserRole;
  onUpdateTaskStatus: (taskId: string, field: keyof SharedOrderTask, value: string) => void;
}

export default function AdminCommandRoom({ tasks, currentRole, onUpdateTaskStatus }: CommandRoomProps) {
  const canEditCatalog = currentRole === 'owner' || currentRole === 'super_admin' || currentRole === 'catalog_admin';
  const canEditOrders = currentRole === 'owner' || currentRole === 'super_admin' || currentRole === 'orders_admin';
  const canEditWarranty = currentRole === 'owner' || currentRole === 'super_admin' || currentRole === 'warranty_admin';

  return (
    <div className="w-full space-y-6" style={{ direction: 'rtl' }}>
      <div className="bg-[#0b1329] p-4 rounded-xl border border-[#334155] flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaShieldAlt className="text-blue-500" /> غرفة العمليات المشتركة (Command Room)
          </h2>
          <p className="text-sm text-gray-400">متابعة حالة القطع، الطلبات، والضمان بشكل جماعي بين جميع المشرفين</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-[#0b1329] border border-[#334155] rounded-xl p-5 shadow-lg space-y-4">
            
            {/* رأس البطاقة وحالة الطلب العامة */}
            <div className="flex flex-wrap justify-between items-center border-b border-[#334155] pb-3 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold font-mono bg-[#1e293b] px-3 py-1 rounded-lg border border-[#334155]">
                  {task.orderCode}
                </span>
                <span className="text-sm text-gray-300">العميل: <strong className="text-[#38bdf8]">@{task.clientUsername}</strong></span>
                <span className="text-xs text-gray-400">SKU القطعة: <span className="font-mono">{task.itemSku}</span></span>
              </div>
              
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  task.generalStatus === 'Under Investigation' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  task.generalStatus === 'Replacement Needed' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  الحالة العامة: {task.generalStatus}
                </span>
              </div>
            </div>

            {/* تفاصيل أقسام المشرفين الثلاثة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              
              {/* قسم الكتالوج (Catalog Admin) */}
              <div className="bg-[#1e293b]/40 p-3 rounded-lg border border-[#334155] space-y-2">
                <div className="flex items-center justify-between text-[#38bdf8] font-semibold">
                  <span className="flex items-center gap-1.5"><FaBoxOpen /> مشرف الكتالوج</span>
                  <span className="text-xs">{task.catalogStatus}</span>
                </div>
                {canEditCatalog ? (
                  <select
                    value={task.catalogStatus}
                    onChange={(e) => onUpdateTaskStatus(task.id, 'catalogStatus', e.target.value)}
                    className="w-full bg-[#0b1329] border border-[#334155] text-white text-xs rounded-lg p-2"
                  >
                    <option value="Pending">Pending (قيد المراجعة)</option>
                    <option value="Approved">Approved (تم الاعتماد)</option>
                    <option value="Image Error Corrected">Image Error Corrected (تصحيح خطأ الصورة)</option>
                  </select>
                ) : (
                  <p className="text-xs text-gray-400">الحالة: {task.catalogStatus}</p>
                )}
              </div>

              {/* قسم الطلبات والنزاعات (Orders Admin) */}
              <div className="bg-[#1e293b]/40 p-3 rounded-lg border border-[#334155] space-y-2">
                <div className="flex items-center justify-between text-amber-400 font-semibold">
                  <span className="flex items-center gap-1.5"><FaClipboardList /> مشرف الطلبات</span>
                  <span className="text-xs">{task.ordersStatus}</span>
                </div>
                {canEditOrders ? (
                  <select
                    value={task.ordersStatus}
                    onChange={(e) => onUpdateTaskStatus(task.id, 'ordersStatus', e.target.value)}
                    className="w-full bg-[#0b1329] border border-[#334155] text-white text-xs rounded-lg p-2"
                  >
                    <option value="Pending">Pending (طبيعي)</option>
                    <option value="Unboxing Issue Flagged">Unboxing Issue Flagged (مشكلة في الـ Unboxing)</option>
                    <option value="Wrong Item Confirmed">Wrong Item Confirmed (تأكيد خطأ القطعة)</option>
                  </select>
                ) : (
                  <p className="text-xs text-gray-400">الحالة: {task.ordersStatus}</p>
                )}
              </div>

              {/* قسم الضمان (Warranty Admin) */}
              <div className="bg-[#1e293b]/40 p-3 rounded-lg border border-[#334155] space-y-2">
                <div className="flex items-center justify-between text-purple-400 font-semibold">
                  <span className="flex items-center gap-1.5"><FaExclamationTriangle /> مسؤول الضمان</span>
                  <span className="text-xs">{task.warrantyStatus}</span>
                </div>
                {canEditWarranty ? (
                  <select
                    value={task.warrantyStatus}
                    onChange={(e) => onUpdateTaskStatus(task.id, 'warrantyStatus', e.target.value)}
                    className="w-full bg-[#0b1329] border border-[#334155] text-white text-xs rounded-lg p-2"
                  >
                    <option value="Not Activated">Not Activated (لم يُفعل)</option>
                    <option value="Frozen">Frozen (مجمّد مؤقتاً)</option>
                    <option value="Active">Active (مفعل)</option>
                  </select>
                ) : (
                  <p className="text-xs text-gray-400">الحالة: {task.warrantyStatus}</p>
                )}
              </div>

            </div>

            {/* ملاحظات مشتركة */}
            <div className="text-xs text-gray-400 bg-[#0b1329] p-2.5 rounded-lg border border-[#334155]/50 flex items-center gap-2">
              <span className="font-bold text-white">ملاحظات الغرفة المشتركة:</span>
              <span>{task.notes}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}