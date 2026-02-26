/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, User, History, Activity, Thermometer, Send, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    todayDate: '',
    patientName: '',
    gender: '',
    dob: '',
    age: '',
    pastHistory: [] as string[],
    otherChronic: '',
    currentPainSite: [] as string[],
    onsetTime: '',
    duration: '',
    painType: '',
    acuteChronic: '',
    treatmentSite: [] as string[],
    tempBefore: '',
    tempAfter: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setFormData(prev => ({ ...prev, todayDate: `${yyyy}-${mm}-${dd}` }));
  }, []);

  const calculateAge = (dobString: string) => {
    if (!dobString) return '';
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 0 ? age.toString() : '0';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      const age = calculateAge(value);
      setFormData(prev => ({ ...prev, [name]: value, age }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pastHistory' | 'currentPainSite' | 'treatmentSite') => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentList = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentList, value] };
      } else {
        return { ...prev, [field]: currentList.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    alert("信息提交成功！\n此弹窗为演示效果，实际应用中可以在此处添加保存到数据库的代码。");
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
      <Icon className="w-5 h-5 text-blue-600" />
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white text-center">
          <div className="flex justify-center mb-2">
            <ClipboardList className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">门诊问诊信息登记表</h1>
          <p className="text-blue-100 text-sm mt-1">请准确填写患者信息，以便为您提供更好的医疗服务</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Today's Date */}
          <div className="flex justify-end items-center gap-2 text-sm text-slate-500">
            <label htmlFor="todayDate">今日日期：</label>
            <input
              type="date"
              id="todayDate"
              name="todayDate"
              value={formData.todayDate}
              readOnly
              className="bg-transparent border-none focus:ring-0 cursor-default"
            />
          </div>

          {/* Basic Info */}
          <section>
            <SectionHeader icon={User} title="基本信息" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">姓名</label>
                <input
                  type="text"
                  name="patientName"
                  required
                  placeholder="请输入患者姓名"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">性别</label>
                <div className="flex gap-4 py-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="男" required onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-600">男</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="女" required onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-600">女</span>
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">出生日期</label>
                <input
                  type="date"
                  name="dob"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">年龄</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  readOnly
                  placeholder="自动计算"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-default outline-none"
                />
              </div>
            </div>
          </section>

          {/* Past History */}
          <section>
            <SectionHeader icon={History} title="既往史" />
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">既往病史</label>
                <div className="flex flex-wrap gap-4">
                  {['高血压', '心脏病', '结核史', '肿瘤史'].map(item => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
                      <input
                        type="checkbox"
                        value={item}
                        onChange={(e) => handleCheckboxChange(e, 'pastHistory')}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-slate-600">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">其他慢性疾病及治疗经过</label>
                <textarea
                  name="otherChronic"
                  placeholder="请输入其他慢性疾病及相关治疗经过..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px]"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Present Illness */}
          <section>
            <SectionHeader icon={Activity} title="现病史" />
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">目前疼痛部位</label>
                <div className="flex flex-wrap gap-3">
                  {['颈部', '肩部', '腰部', '膝关节', '肘关节', '腕关节'].map(site => (
                    <label key={site} className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
                      <input
                        type="checkbox"
                        value={site}
                        onChange={(e) => handleCheckboxChange(e, 'currentPainSite')}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-slate-600">{site}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">何时起病</label>
                  <input
                    type="text"
                    name="onsetTime"
                    placeholder="例如：3天前 / 2023年10月"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">持续时间</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="例如：持续2周 / 间歇性发作1个月"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">疼痛形式</label>
                  <input
                    type="text"
                    name="painType"
                    placeholder="例如：刺痛、钝痛、酸痛、放射痛等"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">病程性质</label>
                  <div className="flex gap-4 py-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="acuteChronic" value="急性" onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-600">急性</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="acuteChronic" value="慢性" onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-600">慢性</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Treatment Site */}
          <section>
            <SectionHeader icon={CheckCircle2} title="本次治疗部位" />
            <div className="flex flex-wrap gap-3">
              {['颈部', '肩部', '腰部', '膝关节', '肘关节', '腕关节'].map(site => (
                <label key={site} className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    value={site}
                    onChange={(e) => handleCheckboxChange(e, 'treatmentSite')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-600">{site}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Infrared Measurements */}
          <section>
            <SectionHeader icon={Thermometer} title="红外测量信息 (℃)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">治疗前局部温度</label>
                <div className="relative">
                  <input
                    type="number"
                    name="tempBefore"
                    step="0.1"
                    placeholder="如 36.5"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    onChange={handleInputChange}
                  />
                  <span className="absolute right-4 top-2 text-slate-400">℃</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">治疗后局部温度</label>
                <div className="relative">
                  <input
                    type="number"
                    name="tempAfter"
                    step="0.1"
                    placeholder="如 37.2"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    onChange={handleInputChange}
                  />
                  <span className="absolute right-4 top-2 text-slate-400">℃</span>
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitted}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-lg transition-all shadow-md ${
                submitted 
                ? 'bg-emerald-500 text-white cursor-default' 
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  提交成功
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  提交问诊信息
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">© 2026 门诊问诊信息登记系统 · 保护患者隐私</p>
        </div>
      </motion.div>
    </div>
  );
}
