// المسار: src/components/admin/AdminCommandRoom.tsx

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SharedOrderTask, UserRole } from '../../types/adminTypes';
import { FaShieldAlt, FaBoxOpen, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';
import './AdminCommandRoom.css'; // استدعاء ملف التنسيقات السيبرانية

interface CommandRoomProps {
  tasks: SharedOrderTask[];
  currentRole: UserRole;
  onUpdateTaskStatus: (taskId: string, field: keyof SharedOrderTask, value: string) => void;
}

export default function AdminCommandRoom({ tasks, currentRole, onUpdateTaskStatus }: CommandRoomProps) {
  const { lang } = useLanguage();

  const canEditCatalog = currentRole === 'owner' || currentRole === 'super_admin' || currentRole === 'catalog_admin';
  const canEditOrders = currentRole === 'owner' || currentRole === 'super_admin' || currentRole === 'orders_admin';
  const canEditWarranty = currentRole === 'owner' || currentRole === 'super_admin' || currentRole === 'warranty_admin';

  return (
    <div className="cmd-container space-y-6">
      
      {/* رأس الغرفة السيبراني */}
      <div className="bg-black/40 p-4 rounded-xl border border-[#00f0ff40] flex justify-between items-center backdrop-blur-md">
        <div>
          <h2 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-2">
            <FaShieldAlt className="text-[#00f0ff]" /> 
            TUNCAR <span className="text-[#00f0ff] sys-num">// COMMAND_ROOM</span>
          </h2>
          <p className="text-[#00ff66] text-xs sys-num mt-1">
            {lang === 'ar' 
              ? 'متابعة حالة القطع، الطلبات، والضمان بشكل جماعي بين جميع المشرفين' 
              : 'Suivi partagé des pièces, commandes et garanties entre administrateurs'}
          </p>
        </div>
      </div>

      {/* قائمة المهام */}
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-black/40 border border-[#00f0ff20] rounded-xl p-5 shadow-lg space-y-4 hover:border-[#00f0ff40] transition">
            
            {/* رأس البطاقة ومعلومات الطلب العامة */}
            <div className="flex flex-wrap justify-between items-center border-b border-[#00f0ff20] pb-3 gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#00f0ff] font-bold font-mono bg-[#00f0ff]/10 px-3 py-1 rounded border border-[#00f0ff]/30 text-xs">
                  {task.orderCode}
                </span>
                <span className="text-sm text-slate-300">
                  {lang === 'ar' ? 'العميل:' : 'Client:'} <strong className="text-white">@{task.clientUsername}</strong>
                </span>
                <span className="text-xs text-slate-400">
                  SKU: <span className="font-mono text-[#00ff66]">{task.itemSku}</span>
                </span>
              </div>
              
              <div>
                <span className={`px-3 py-1 rounded text-xs font-mono border ${
                  task.generalStatus === 'Under Investigation' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                  task.generalStatus === 'Replacement Needed' ? 'bg-[#ff5500]/10 text-[#ff5500] border-[#ff5500]/30' :
                  'bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/30'
                }`}>
                  {lang === 'ar' ? 'الحالة العامة:' : 'Statut Global:'} {task.generalStatus}
                </span>
              </div>
            </div>

            {/* أقسام المشرفين الثلاثة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              
              {/* مشرف الكتالوج */}
              <div className="bg-black/60 p-3 rounded border border-[#00f0ff20] space-y-2">
                <div className="flex items-center justify-between text-[#00f0ff] font-semibold text-xs">
                  <span className="flex items-center gap-1.5"><FaBoxOpen /> {lang === 'ar' ? 'مشرف الكتالوج' : 'Catalog Admin'}</span>
                  <span className="font-mono text-[11px]">{task.catalogStatus}</span>
                </div>
                {canEditCatalog ? (
                  <select
                    value={task.catalogStatus}
                    onChange={(e) => onUpdateTaskStatus(task.id, 'catalogStatus', e.target.value)}
                    className="w-full bg-black border border-[#00f0ff40] text-white text-xs rounded p-2 outline-none focus:border-[#00f0ff]"
                  >
                    <option value="Pending">Pending (قيد المراجعة)</option>
                    <option value="Approved">Approved (تم الاعتماد)</option>
                    <option value="Image Error Corrected">Image Error Corrected (تصحيح خطأ الصورة)</option>
                  </select>
                ) : (
                  <p className="text-xs text-slate-400">{lang === 'ar' ? 'الحالة:' : 'Statut:'} {task.catalogStatus}</p>
                )}
              </div>

              {/* مشرف الطلبات */}
              <div className="bg-black/60 p-3 rounded border border-[#00f0ff20] space-y-2">
                <div className="flex items-center justify-between text-amber-400 font-semibold text-xs">
                  <span className="flex items-center gap-1.5"><FaClipboardList /> {lang === 'ar' ? 'مشرف الطلبات' : 'Orders Admin'}</span>
                  <span className="font-mono text-[11px]">{task.ordersStatus}</span>
                </div>
                {canEditOrders ? (
                  <select
                    value={task.ordersStatus}
                    onChange={(e) => onUpdateTaskStatus(task.id, 'ordersStatus', e.target.value)}
                    className="w-full bg-black border border-[#00f0ff40] text-white text-xs rounded p-2 outline-none focus:border-[#00f0ff]"
                  >
                    <option value="Pending">Pending (طبيعي)</option>
                    <option value="Unboxing Issue Flagged">Unboxing Issue Flagged (مشكلة في الـ Unboxing)</option>
                    <option value="Wrong Item Confirmed">Wrong Item Confirmed (تأكيد خطأ القطعة)</option>
                  </select>
                ) : (
                  <p className="text-xs text-slate-400">{lang === 'ar' ? 'الحالة:' : 'Statut:'} {task.ordersStatus}</p>
                )}
              </div>

              {/* مسؤول الضمان */}
              <div className="bg-black/60 p-3 rounded border border-[#00f0ff20] space-y-2">
                <div className="flex items-center justify-between text-[#ff5500] font-semibold text-xs">
                  <span className="flex items-center gap-1.5"><FaExclamationTriangle /> {lang === 'ar' ? 'مسؤول الضمان' : 'Warranty Admin'}</span>
                  <span className="font-mono text-[11px]">{task.warrantyStatus}</span>
                </div>
                {canEditWarranty ? (
                  <select
                    value={task.warrantyStatus}
                    onChange={(e) => onUpdateTaskStatus(task.id, 'warrantyStatus', e.target.value)}
                    className="w-full bg-black border border-[#00f0ff40] text-white text-xs rounded p-2 outline-none focus:border-[#00f0ff]"
                  >
                    <option value="Not Activated">Not Activated (لم يُفعل)</option>
                    <option value="Frozen">Frozen (مجمّد مؤقتاً)</option>
                    <option value="Active">Active (مفعل)</option>
                  </select>
                ) : (
                  <p className="text-xs text-slate-400">{lang === 'ar' ? 'الحالة:' : 'Statut:'} {task.warrantyStatus}</p>
                )}
              </div>

            </div>

            {/* ملاحظات الغرفة المشتركة */}
            <div className="text-xs text-slate-300 bg-black/60 p-2.5 rounded border border-[#00f0ff10] flex items-center gap-2">
              <span className="font-bold text-[#00f0ff]">{lang === 'ar' ? 'ملاحظات الغرفة المشتركة:' : 'Notes de la salle de commande:'}</span>
              <span className="text-slate-400">{task.notes}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}