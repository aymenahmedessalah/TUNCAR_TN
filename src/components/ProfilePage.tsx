import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  Car, Plus, Trash2, Camera, Globe 
} from 'lucide-react';
import './ProfilePage.css';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  phones: string[];
  addresses: string[];
  locations: string[];
  specialty: string;
  cars: { brand: string; model: string; year: string }[];
  language: 'ar' | 'fr' | 'en';
}

interface ProfilePageProps {
  onSave?: (profile: UserProfile) => void;
}

const tunisianStates = [
  "أريانة (Ariana)", "باجة (Béja)", "بن عروس (Ben Arous)", "بنزرت (Bizerte)",
  "قابس (Gabès)", "قفصة (Gafsa)", "جندوبة (Jendouba)", "القيروان (Kairouan)",
  "القصرين (Kasserine)", "قبلي (Kébili)", "الكاف (Le Kef)", "مهدية (Mahdia)",
  "منوبة (Manouba)", "مدنين (Médenine)", "منستير (Monastir)", "نابل (Nabeul)",
  "صفاقس (Sfax)", "سيدي بوزيد (Sidi Bouzid)", "سليانة (Siliana)", "سوسة (Sousse)",
  "تطاوين (Tataouine)", "توزر (Tozeur)", "تونس (Tunis)", "زغوان (Zaghouan)"
];

const translations = {
  ar: {
    title: "إعدادات الملف الشخصي",
    subtitle: "تحديث معلوماتك الشخصية، سياراتك، وعناوينك في منصة TUNCAR.TN",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phones: "أرقام الهواتف (الحد الأقصى 5)",
    addresses: "العناوين (الحد الأقصى 5)",
    locations: "الولايات (تونس)",
    specialty: "التخصص / النشاط",
    cars: "السيارات المرتبطة بالحساب (الحد الأقصى 5)",
    addPhone: "إضافة رقم هاتف",
    addAddress: "إضافة عنوان جديد",
    addCar: "إضافة سيارة جديدة",
    brand: "الماركة",
    model: "الموديل",
    year: "السنة",
    save: "حفظ التغييرات",
    success: "تم حفظ التغييرات بنجاح!"
  },
  fr: {
    title: "Configuration du Profil",
    subtitle: "Mettez à jour vos informations, véhicules et adresses sur TUNCAR.TN",
    name: "Nom complet",
    email: "Adresse E-mail",
    phones: "Numéros de téléphone (Max 5)",
    addresses: "Adresses (Max 5)",
    locations: "Gouvernorats (Tunisie)",
    specialty: "Spécialité / Activité",
    cars: "Véhicules enregistrés (Max 5)",
    addPhone: "Ajouter un téléphone",
    addAddress: "Ajouter une adresse",
    addCar: "Ajouter un véhicule",
    brand: "Marque",
    model: "Modèle",
    year: "Année",
    save: "Enregistrer les modifications",
    success: "Modifications enregistrées avec succès !"
  },
  en: {
    title: "Profile Configuration",
    subtitle: "Update your personal info, vehicles, and addresses on TUNCAR.TN",
    name: "Full Name",
    email: "Email Address",
    phones: "Phone Numbers (Max 5)",
    addresses: "Addresses (Max 5)",
    locations: "Governorates (Tunisia)",
    specialty: "Specialty / Activity",
    cars: "Registered Cars (Max 5)",
    addPhone: "Add Phone Number",
    addAddress: "Add Address",
    addCar: "Add Car",
    brand: "Brand",
    model: "Model",
    year: "Year",
    save: "Save Changes",
    success: "Changes saved successfully!"
  }
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ onSave }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Aymen Essalah',
    email: 'owner@tuncar.tn',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phones: ['+216 98 123 456'],
    addresses: ['Rue de la République, Tunis'],
    locations: ['تونس (Tunis)'],
    specialty: 'Automotive & Mechatronics Engineering',
    cars: [{ brand: 'Volkswagen', model: 'Golf 6 Style', year: '2012' }],
    language: 'fr'
  });

  const [savedMessage, setSavedMessage] = useState(false);
  const t = translations[profile.language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result;
        if (typeof result === 'string') {
          setProfile(prev => ({ ...prev, avatar: result }));
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...profile.phones];
    newPhones[index] = value;
    setProfile(prev => ({ ...prev, phones: newPhones }));
  };

  const addPhone = () => {
    if (profile.phones.length < 5) {
      setProfile(prev => ({ ...prev, phones: [...prev.phones, ''] }));
    }
  };

  const removePhone = (index: number) => {
    setProfile(prev => ({ ...prev, phones: prev.phones.filter((_, i) => i !== index) }));
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...profile.addresses];
    newAddresses[index] = value;
    setProfile(prev => ({ ...prev, addresses: newAddresses }));
  };

  const addAddress = () => {
    if (profile.addresses.length < 5) {
      setProfile(prev => ({ ...prev, addresses: [...prev.addresses, ''] }));
    }
  };

  const removeAddress = (index: number) => {
    setProfile(prev => ({ ...prev, addresses: prev.addresses.filter((_, i) => i !== index) }));
  };

  const toggleLocation = (loc: string) => {
    setProfile(prev => {
      const exists = prev.locations.includes(loc);
      if (exists) {
        return { ...prev, locations: prev.locations.filter(l => l !== loc) };
      } else {
        return { ...prev, locations: [...prev.locations, loc] };
      }
    });
  };

  const handleCarChange = (index: number, field: 'brand' | 'model' | 'year', value: string) => {
    const newCars = [...profile.cars];
    newCars[index][field] = value;
    setProfile(prev => ({ ...prev, cars: newCars }));
  };

  const addCar = () => {
    if (profile.cars.length < 5) {
      setProfile(prev => ({ ...prev, cars: [...prev.cars, { brand: '', model: '', year: '' }] }));
    }
  };

  const removeCar = (index: number) => {
    setProfile(prev => ({ ...prev, cars: prev.cars.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(profile);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className={`profile-container-inner ${profile.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="profile-header-flex">
        <div>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>
        <div className="language-selector">
          <Globe size={18} />
          <select name="language" value={profile.language} onChange={handleChange}>
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {savedMessage && <div className="success-banner">{t.success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img src={profile.avatar} alt="Profile Avatar" />
            <label htmlFor="avatar-upload" className="avatar-upload-btn">
              <Camera size={16} />
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-group">
            <label>{t.name}</label>
            <div className="input-icon-wrapper">
              <User size={18} />
              <input type="text" name="name" value={profile.name} onChange={handleChange} required />
            </div>
          </div>
          <div className="profile-group">
            <label>{t.email}</label>
            <div className="input-icon-wrapper">
              <Mail size={18} />
              <input type="email" name="email" value={profile.email} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="profile-group">
          <label>{t.specialty}</label>
          <div className="input-icon-wrapper">
            <Briefcase size={18} />
            <input type="text" name="specialty" value={profile.specialty} onChange={handleChange} />
          </div>
        </div>

        <div className="dynamic-section">
          <div className="section-header">
            <label><Phone size={18} /> {t.phones}</label>
            {profile.phones.length < 5 && (
              <button type="button" onClick={addPhone} className="add-btn"><Plus size={16} /> {t.addPhone}</button>
            )}
          </div>
          {profile.phones.map((phone, index) => (
            <div key={index} className="dynamic-row">
              <input type="text" value={phone} onChange={(e) => handlePhoneChange(index, e.target.value)} placeholder="+216 XX XXX XXX" />
              {profile.phones.length > 1 && (
                <button type="button" onClick={() => removePhone(index)} className="remove-btn"><Trash2 size={16} /></button>
              )}
            </div>
          ))}
        </div>

        <div className="dynamic-section">
          <div className="section-header">
            <label><MapPin size={18} /> {t.addresses}</label>
            {profile.addresses.length < 5 && (
              <button type="button" onClick={addAddress} className="add-btn"><Plus size={16} /> {t.addAddress}</button>
            )}
          </div>
          {profile.addresses.map((addr, index) => (
            <div key={index} className="dynamic-row">
              <input type="text" value={addr} onChange={(e) => handleAddressChange(index, e.target.value)} placeholder="Rue, Ville..." />
              {profile.addresses.length > 1 && (
                <button type="button" onClick={() => removeAddress(index)} className="remove-btn"><Trash2 size={16} /></button>
              )}
            </div>
          ))}
        </div>

        <div className="profile-group">
          <label><MapPin size={18} /> {t.locations}</label>
          <div className="tunisia-map-grid">
            {tunisianStates.map((state) => {
              const isSelected = profile.locations.includes(state);
              return (
                <div key={state} className={`state-chip ${isSelected ? 'selected' : ''}`} onClick={() => toggleLocation(state)}>
                  {state}
                </div>
              );
            })}
          </div>
        </div>

        <div className="dynamic-section">
          <div className="section-header">
            <label><Car size={18} /> {t.cars}</label>
            {profile.cars.length < 5 && (
              <button type="button" onClick={addCar} className="add-btn"><Plus size={16} /> {t.addCar}</button>
            )}
          </div>
          {profile.cars.map((car, index) => (
            <div key={index} className="car-row">
              <input type="text" placeholder={t.brand} value={car.brand} onChange={(e) => handleCarChange(index, 'brand', e.target.value)} />
              <input type="text" placeholder={t.model} value={car.model} onChange={(e) => handleCarChange(index, 'model', e.target.value)} />
              <input type="text" placeholder={t.year} value={car.year} onChange={(e) => handleCarChange(index, 'year', e.target.value)} />
              {profile.cars.length > 1 && (
                <button type="button" onClick={() => removeCar(index)} className="remove-btn"><Trash2 size={16} /></button>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">{t.save}</button>
      </form>
    </div>
  );
};

export default ProfilePage;