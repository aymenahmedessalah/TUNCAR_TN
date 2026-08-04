import { wipeDatabase } from './db';

const EMERGENCY_STATE_KEY = 'tuncar_emergency_state_v1';

export interface EmergencyState {
  isActive: boolean;
  timeLeft: number; // بالثواني (مثلاً 600 ثانية = 10 دقائق)
  triggeredAt: number | null;
}

// التحقق من حالة الطوارئ الحالية
const getEmergencyState = (): EmergencyState => {
  const state = localStorage.getItem(EMERGENCY_STATE_KEY);
  if (!state) {
    return { isActive: false, timeLeft: 0, triggeredAt: null };
  }
  try {
    return JSON.parse(state);
  } catch {
    return { isActive: false, timeLeft: 0, triggeredAt: null };
  }
};

// حفظ حالة الطوارئ
const saveEmergencyState = (state: EmergencyState): void => {
  localStorage.setItem(EMERGENCY_STATE_KEY, JSON.stringify(state));
};

// تفعيل وضع العد التنازلي للطوارئ النووية (تدمير شامل مرتقب)
export const triggerEmergencyCountdown = (): EmergencyState => {
  const newState: EmergencyState = {
    isActive: true,
    timeLeft: 600, // 10 دقائق
    triggeredAt: Date.now()
  };
  saveEmergencyState(newState);
  return newState;
};

// معالجة العبارات السرية السيادية المدخلة
export const processEmergencyPhrase = (phrase: string): { success: boolean; message: string; action: 'none' | 'aborted' | 'wiped' } => {
  const cleanedPhrase = phrase.trim();
  const state = getEmergencyState();

  if (!state.isActive) {
    return { success: false, message: 'لا يوجد عد تنازلي للطوارئ نشط حالياً.', action: 'none' };
  }

  // عبارة الإلغاء (إجهاض التدمير)
  if (cleanedPhrase === 'الحمد لله') {
    localStorage.removeItem(EMERGENCY_STATE_KEY);
    return { success: true, message: 'تم إلغاء بروتوكول الطوارئ بنجاح واستقرار النظام.', action: 'aborted' };
  }

  // عبارة التأكيد والتدمير الفوري الشامل
  if (cleanedPhrase === 'انا لله و انا اليه راجعون') {
    wipeDatabase();
    localStorage.removeItem(EMERGENCY_STATE_KEY);
    // إنهاء الجلسة وإجبار إعادة التوجيه
    localStorage.clear();
    return { success: true, message: 'تم تفعيل التدمير الشامل ومسح كافة البيانات بنجاح.', action: 'wiped' };
  }

  return { success: false, message: 'العبارة المدخلة غير مطابقة لأي أمر سيادي.', action: 'none' };
};

// تحديث عداد الوقت (يتم استدعاؤها دورياً)
export const tickEmergencyTimer = (): { state: EmergencyState; isExpired: boolean } => {
  let state = getEmergencyState();
  if (!state.isActive || !state.triggeredAt) {
    return { state, isExpired: false };
  }

  const elapsedSeconds = Math.floor((Date.now() - state.triggeredAt) / 1000);
  const remaining = 600 - elapsedSeconds;

  if (remaining <= 0) {
    // انتهى الوقت: تدمير تلقائي فوري
    wipeDatabase();
    localStorage.clear();
    return { state: { isActive: false, timeLeft: 0, triggeredAt: null }, isExpired: true };
  }

  state.timeLeft = remaining;
  saveEmergencyState(state);
  return { state, isExpired: false };
};