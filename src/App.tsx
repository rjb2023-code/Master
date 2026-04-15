/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

const InputField = ({ label, subLabel, id, type = "text", placeholder = "", className = "", value, onChange, required = false, maxLength, pattern, title }: any) => (
  <div className={`flex flex-col gap-2 mb-6 ${className}`}>
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      {label} {required && <span className="text-red-500">*</span>}
      {subLabel && <span className="block normal-case tracking-normal font-normal mt-1">{subLabel}</span>}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      pattern={pattern}
      title={title}
      className="p-3 border border-gray-200 rounded text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-600 transition-colors"
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, subLabel, id, options, className = "", value, onChange, required = false }: any) => (
  <div className={`flex flex-col gap-2 mb-6 ${className}`}>
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      {label} {required && <span className="text-red-500">*</span>}
      {subLabel && <span className="block normal-case tracking-normal font-normal mt-1">{subLabel}</span>}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="p-3 border border-gray-200 rounded text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-600 transition-colors appearance-none"
    >
      <option value="" disabled>Pilih salah satu...</option>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, subLabel, id, placeholder = "", className = "", rows = 3, value, onChange, required = false }: any) => (
  <div className={`flex flex-col gap-2 mb-6 ${className}`}>
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      {label} {required && <span className="text-red-500">*</span>}
      {subLabel && <span className="block normal-case tracking-normal font-normal mt-1">{subLabel}</span>}
    </label>
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
      className="p-3 border border-gray-200 rounded text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-600 transition-colors resize-y"
      placeholder={placeholder}
    />
  </div>
);

const RadioGroup = ({ label, subLabel, name, options, value, onChange, required = false, className = "" }: any) => (
  <div className={`flex flex-col gap-2 mb-6 ${className}`}>
    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
        {subLabel && <span className="block normal-case tracking-normal font-normal mt-1">{subLabel}</span>}
    </label>
    <div className="flex flex-wrap gap-4 items-center mt-1">
        {options.map((opt: any) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                <input 
                    type="radio" 
                    name={name} 
                    value={opt.value} 
                    checked={value === opt.value}
                    onChange={onChange}
                    required={required}
                    className="w-4 h-4 m-0 accent-blue-600" 
                />
                <span className="text-sm text-gray-900">{opt.label}</span>
            </label>
        ))}
    </div>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    formNumber: '',
    vendorType: 'badan_usaha', // 'badan_usaha' | 'perorangan'
    
    // Identifier Utama
    npwpPerusahaan: '',
    statusPkp: '',
    nib: '',
    nik: '',
    npwpPribadi: '',

    // Nama & Tipe
    supplierName: '',
    klasifikasiBadanUsaha: '',
    flagPersonalVendor: '',
    flagExEmployee: '',
    flagPrincipal: '',

    // Alamat
    address: '',
    postalCode: '',
    city: '',
    provinsi: '',
    country: '',

    // Kontak
    emailPerusahaan: '',
    teleponPerusahaan: '',
    namaPic: '',
    emailPic: '',
    teleponPic: '',
    emailKontak: '',
    teleponKontak: '',

    // Finansial
    bankName: '',
    accountNo: '',
    accountName: '',

    // Dokumen Pendukung
    attachments: {
      scanNpwpPerusahaan: false,
      scanNib: false,
      sppkp: false,
      ktpDireksi: false,
      aktaPendirian: false,
      dokumenIzinLainnya: false,
      scanKtp: false,
      scanNpwpPribadi: false,
      suratKuasa: false,
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    // Auto capitalize supplierName
    if (id === 'supplierName') {
      setFormData(prev => ({ ...prev, [id]: value.toUpperCase() }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAttachmentChange = (field: keyof typeof formData.attachments) => {
    setFormData(prev => ({
      ...prev,
      attachments: {
        ...prev.attachments,
        [field]: !prev.attachments[field]
      }
    }));
  };

  const isBadanUsaha = formData.vendorType === 'badan_usaha';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-12 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-gray-200">
        
        {/* Header */}
        <header className="mb-8 border-b border-gray-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div>
             <h1 className="text-2xl font-semibold tracking-tight mb-2">Supplier Master Data</h1>
             <p className="text-sm text-gray-500">PT. Chitra Paratama - Total Tire Solution</p>
           </div>
           
           <div className="flex items-center gap-4">
             <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Form Number</label>
             <input 
               type="text" 
               id="formNumber"
               value={formData.formNumber}
               onChange={handleInputChange}
               className="p-2 border border-gray-200 rounded text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-600 transition-colors w-48" 
             />
           </div>
        </header>

        <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted successfully!\n\nData:\n' + JSON.stringify(formData, null, 2)); }}>
          
          <section className="mb-12">
            <SelectField
              id="vendorType"
              label="Klasifikasi Vendor"
              value={formData.vendorType}
              onChange={handleInputChange}
              options={[
                { value: 'badan_usaha', label: '7.1. Vendor Badan Usaha (PT, CV, Firma, dll.)' },
                { value: 'perorangan', label: '7.2. Vendor Perorangan (Individu)' }
              ]}
              required
            />
          </section>

          {/* Section: Identifier Utama */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Identifier Utama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {isBadanUsaha ? (
                <>
                  <InputField 
                    id="npwpPerusahaan"
                    label="NPWP Perusahaan" 
                    subLabel="Format 16 digit tanpa simbol dan spasi" 
                    value={formData.npwpPerusahaan}
                    onChange={handleInputChange}
                    maxLength={16}
                    pattern="\d{16}"
                    title="16 digit angka"
                    placeholder="Contoh: 0020258737091000"
                    required
                  />
                  <SelectField
                    id="statusPkp"
                    label="Status PKP / Non-PKP"
                    value={formData.statusPkp}
                    onChange={handleInputChange}
                    options={[
                      { value: 'PKP', label: 'PKP' },
                      { value: 'Non-PKP', label: 'Non-PKP' }
                    ]}
                    required
                  />
                  <InputField 
                    id="nib"
                    label="NIB (Nomor Induk Berusaha)" 
                    value={formData.nib}
                    onChange={handleInputChange}
                    required
                  />
                </>
              ) : (
                <>
                  <InputField 
                    id="nik"
                    label="NIK (Nomor Induk Kependudukan)" 
                    subLabel="Sesuai KTP" 
                    value={formData.nik}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField 
                    id="npwpPribadi"
                    label="NPWP Pribadi" 
                    subLabel="Opsional. Jika tidak ada, wajib lampirkan surat keterangan Non-PKP." 
                    value={formData.npwpPribadi}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
          </section>

          {/* Section: Nama & Tipe */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Nama & Tipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField 
                  id="supplierName"
                  label="Nama Vendor" 
                  subLabel={isBadanUsaha ? "Tanpa menyertakan badan usaha (PT, CV, dll). Format KAPITAL." : "Sesuai nama lengkap di KTP. Format KAPITAL."}
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  placeholder={isBadanUsaha ? "TRAKINDO UTAMA" : "BUDI SANTOSO"}
                  required
              />

              {isBadanUsaha && (
                <SelectField
                  id="klasifikasiBadanUsaha"
                  label="Klasifikasi Badan Usaha"
                  value={formData.klasifikasiBadanUsaha}
                  onChange={handleInputChange}
                  options={[
                    { value: 'PT', label: 'PT' },
                    { value: 'CV', label: 'CV' },
                    { value: 'Firma', label: 'Firma' },
                    { value: 'Lainnya', label: 'Lainnya' }
                  ]}
                  required
                />
              )}

              <RadioGroup
                name="flagPersonalVendor"
                label="Flag Personal Vendor"
                value={formData.flagPersonalVendor}
                onChange={handleRadioChange}
                options={[
                  { value: 'Personalia', label: 'Personalia' },
                  { value: 'Badan Usaha', label: 'Badan Usaha' }
                ]}
                required
              />

              <RadioGroup
                name="flagExEmployee"
                label="Flag Vendor Ex-Employee"
                value={formData.flagExEmployee}
                onChange={handleRadioChange}
                options={[
                  { value: 'Ya', label: 'Ya' },
                  { value: 'Tidak', label: 'Tidak' }
                ]}
                required
              />

              <RadioGroup
                name="flagPrincipal"
                label="Flag Vendor Principal"
                value={formData.flagPrincipal}
                onChange={handleRadioChange}
                options={[
                  { value: 'Principal', label: 'Principal' },
                  { value: 'Non-Principal', label: 'Non-Principal' }
                ]}
                required
              />
            </div>
          </section>

          {/* Section: Alamat */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Alamat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <TextAreaField 
                  id="address"
                  label="Alamat Lengkap" 
                  subLabel={!isBadanUsaha ? "Sesuai alamat di KTP" : ""}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="md:col-span-2"
                  required
              />
              <InputField id="city" label="Kota" value={formData.city} onChange={handleInputChange} required />
              <InputField id="provinsi" label="Provinsi" value={formData.provinsi} onChange={handleInputChange} required />
              <InputField id="country" label="Negara" value={formData.country} onChange={handleInputChange} required />
              <InputField id="postalCode" label="Kode Pos" value={formData.postalCode} onChange={handleInputChange} />
            </div>
          </section>

          {/* Section: Kontak */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Kontak</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {isBadanUsaha ? (
                <>
                  <InputField id="emailPerusahaan" label="Email Perusahaan" type="email" value={formData.emailPerusahaan} onChange={handleInputChange} required />
                  <InputField id="teleponPerusahaan" label="Telepon Perusahaan" value={formData.teleponPerusahaan} onChange={handleInputChange} required />
                  <InputField id="namaPic" label="Nama PIC" value={formData.namaPic} onChange={handleInputChange} required />
                  <InputField id="emailPic" label="Email PIC" type="email" value={formData.emailPic} onChange={handleInputChange} required />
                  <InputField id="teleponPic" label="Telepon PIC" value={formData.teleponPic} onChange={handleInputChange} required />
                </>
              ) : (
                <>
                  <InputField id="emailKontak" label="Email Kontak" type="email" value={formData.emailKontak} onChange={handleInputChange} required />
                  <InputField id="teleponKontak" label="Telepon Kontak" value={formData.teleponKontak} onChange={handleInputChange} required />
                </>
              )}
            </div>
          </section>

          {/* Section: Finansial */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Finansial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField id="bankName" label="Nama Bank" value={formData.bankName} onChange={handleInputChange} required />
                <InputField id="accountNo" label="Nomor Rekening" value={formData.accountNo} onChange={handleInputChange} required />
                <InputField 
                  id="accountName" 
                  label="Nama Pemilik Rekening" 
                  subLabel={isBadanUsaha ? "Sesuai nama legal Badan Usaha" : "Sesuai nama di KTP"}
                  value={formData.accountName} 
                  onChange={handleInputChange} 
                  className="md:col-span-2"
                  required 
                />
                {!isBadanUsaha && (
                  <div className="md:col-span-2 text-xs text-gray-500 bg-gray-50 p-4 rounded border border-gray-200">
                    <strong>Catatan:</strong><br/>
                    1. Jika nama pemilik rekening berbeda dengan KTP, wajib melampirkan Surat Kuasa.<br/>
                    2. Untuk sewa aset atas nama orang lain, wajib melampirkan Surat Kuasa dari pemilik aset.
                  </div>
                )}
            </div>
          </section>

          {/* Section: Dokumen Pendukung */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Dokumen Pendukung</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {isBadanUsaha ? (
                <>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.scanNpwpPerusahaan} onChange={() => handleAttachmentChange('scanNpwpPerusahaan')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">Scan NPWP Perusahaan <span className="text-red-500">*</span></span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.scanNib} onChange={() => handleAttachmentChange('scanNib')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">Scan NIB <span className="text-red-500">*</span></span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.sppkp} onChange={() => handleAttachmentChange('sppkp')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">Surat Pengukuhan PKP (Jika PKP)</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.ktpDireksi} onChange={() => handleAttachmentChange('ktpDireksi')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">KTP Direksi/Penanggung Jawab <span className="text-red-500">*</span></span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.aktaPendirian} onChange={() => handleAttachmentChange('aktaPendirian')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">Akta Pendirian & Perubahan <span className="text-red-500">*</span></span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.dokumenIzinLainnya} onChange={() => handleAttachmentChange('dokumenIzinLainnya')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">Dokumen Izin Pendukung Lainnya</span>
                  </label>
                </>
              ) : (
                <>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.scanKtp} onChange={() => handleAttachmentChange('scanKtp')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">Scan KTP <span className="text-red-500">*</span></span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.scanNpwpPribadi} onChange={() => handleAttachmentChange('scanNpwpPribadi')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">Scan NPWP Pribadi / Surat Keterangan Non-PKP <span className="text-red-500">*</span></span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.attachments.suratKuasa} onChange={() => handleAttachmentChange('suratKuasa')} className="w-4 h-4 m-0 accent-blue-600" />
                    <span className="text-sm text-gray-900">Surat Kuasa (Jika nama rekening berbeda)</span>
                  </label>
                </>
              )}
            </div>
          </section>

          {/* Section 4: Signatures */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Implementing Department</p>
                </div>
                <div className="flex h-40">
                  <div className="flex-1 p-4 border-r border-gray-200 flex flex-col items-center justify-end">
                    <div className="w-full border-t border-gray-300 pt-2 text-center">
                      <p className="text-sm font-medium text-gray-900">Superior</p>
                      <p className="text-xs text-gray-500">Sales Manager</p>
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col items-center justify-end">
                    <div className="w-full border-t border-gray-300 pt-2 text-center">
                      <p className="text-sm font-medium text-gray-900">Sales Department</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Supplier Liable Person</p>
                </div>
                <div className="p-4 h-40 flex flex-col items-center justify-end">
                    <div className="w-full border-t border-gray-300 pt-2 text-center">
                      <p className="text-sm font-medium text-gray-900">Sign & Stamp Company Seal</p>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4 items-center">
            <button type="button" className="text-sm text-gray-500 hover:text-gray-900 bg-transparent border-none cursor-pointer">
                Cancel
            </button>
            <button 
                type="submit" 
                className="bg-blue-600 text-white border-none py-3 px-8 rounded font-medium text-sm cursor-pointer shadow-[0_4px_6px_-1px_rgba(37,99,235,0.2)] hover:bg-blue-700 transition-colors"
            >
              Submit Master Data
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
