import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormButton from "../../../public/components/FormButton";
import FormInput from "../../../public/components/FormInput";
import FormSelect from "../../../public/components/FormSelect";
import LoadingSpinner from "../../../public/components/LoadingSpinner";
import Card from "./Card";
import "../../styles/ApplicationForm.css";
import api from "../../services/api-client";

// مكون الفورم الرئيسي لتقديم الطلب
const ApplicationForm = () => {
  // استخدام الترجمة
  const { t } = useTranslation();
  // حالة الخطوة الحالية
  const [step, setStep] = useState(1);
  // حالة بيانات الفورم
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    category: "",
    alcoholic: "",
    glass: "",
    ingredients: [],
  });
  // حالة الأخطاء لكل حقل
  const [errors, setErrors] = useState({});
  // حالة نتيجة البحث عن مشروب
  const [drinkResult, setDrinkResult] = useState(null);
  // حالة التحميل
  const [loading, setLoading] = useState(false);
  // خيارات القوائم المنسدلة
  const [options, setOptions] = useState({
    categories: [],
    alcoholics: [],
    glasses: [],
    ingredients: [],
  });

  // جلب الخيارات من API عند تحميل الصفحة
  useEffect(() => {
    const fetchOptions = async () => {
      //jb;jv
      const [cat, alc, glass, ing] = await Promise.all([
        api.get("list.php?c=list"),
        api.get("list.php?a=list"),
        api.get("list.php?g=list"),
        api.get("list.php?i=list"),
      ]);
      setOptions({
        categories: cat.data.drinks.map((d) => ({
          value: d.strCategory,
          label: d.strCategory,
        })),
        alcoholics: alc.data.drinks.map((d) => ({
          value: d.strAlcoholic,
          label: d.strAlcoholic,
        })),
        glasses: glass.data.drinks.map((d) => ({
          value: d.strGlass,
          label: d.strGlass,
        })),
        ingredients: ing.data.drinks.map((d) => ({
          value: d.strIngredient1,
          label: d.strIngredient1,
        })),
      });
    };
    fetchOptions();
  }, []);

  // دالة التحقق من صحة البيانات حسب الخطوة
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      // تحقق من المعلومات الشخصية
      if (!form.name.trim()) newErrors.name = t("form.errors.name");
      if (!form.surname.trim()) newErrors.surname = t("form.errors.surname");
      if (!form.phone.trim()) newErrors.phone = t("form.errors.phone");
      if (!form.email.trim()) newErrors.email = t("form.errors.email");
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
        newErrors.email = t("form.errors.emailInvalid");
    } else if (step === 2) {
      // تحقق من تفضيلات المشروب
      if (!form.category) newErrors.category = t("form.errors.category");
      if (!form.alcoholic) newErrors.alcoholic = t("form.errors.alcoholic");
      if (!form.glass) newErrors.glass = t("form.errors.glass");
      if (!form.ingredients || form.ingredients.length === 0)
        newErrors.ingredients = t("form.errors.ingredients");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // دوال تغيير القيم
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };
  const handleSelectChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };
  const handleMultiSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, ingredients: selected });
    setErrors({ ...errors, ingredients: undefined });
  };

  // دالة الانتقال للخطوة التالية مع التحقق
  const handleNext = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep()) return;
    if (step === 3) {
      setLoading(true);
      // جلب مشروب مناسب حسب المكونات أو التصنيف
      let res = null;
      if (form.ingredients.length > 0) {
        res = await api.get(`filter.php?i=${form.ingredients[0]}`);
      } else if (form.category) {
        res = await api.get(`filter.php?c=${form.category}`);
      }
      setDrinkResult(res?.data?.drinks || []);
      setLoading(false);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };
  // دالة العودة للخطوة السابقة
  const handleBack = () => setStep(step - 1);

  // الخطوة الأولى: معلومات شخصية
  const renderStep1 = () => (
    <form className="form-card application-form-card" onSubmit={handleNext}>
      {/* عنوان الخطوة */}
      <h2 className="form-title">{t("form.personalInfo")}</h2>
      <div className="form-row">
        <div className="form-group">
          <FormInput
            type="text"
            name="name"
            placeholder={t("form.name")}
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input error" : "input"}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <FormInput
            type="text"
            name="surname"
            placeholder={t("form.surname")}
            value={form.surname}
            onChange={handleChange}
            className={errors.surname ? "input error" : "input"}
          />
          {errors.surname && <div className="form-error">{errors.surname}</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <FormInput
            type="text"
            name="phone"
            placeholder={t("form.phone")}
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? "input error" : "input"}
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>
        <div className="form-group">
          <FormInput
            type="email"
            name="email"
            placeholder={t("form.email")}
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input error" : "input"}
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
      </div>
      <div className="form-actions">
        <FormButton text={t("form.next")} type="submit" />
      </div>
    </form>
  );

  // الخطوة الثانية: تفضيلات المشروب
  const renderStep2 = () => (
    <form className="form-card application-form-card" onSubmit={handleNext}>
      <h2 className="form-title">{t("form.drinkPreferences")}</h2>
      <div className="form-row">
        <div className="form-group">
          <FormSelect
            name="category"
            value={form.category}
            onChange={handleSelectChange}
            options={options.categories}
            placeholder={t("form.category")}
            className={errors.category ? "form-select error" : "form-select"}
          />
          {errors.category && (
            <div className="form-error">{errors.category}</div>
          )}
        </div>
        <div className="form-group">
          <FormSelect
            name="alcoholic"
            value={form.alcoholic}
            onChange={handleSelectChange}
            options={options.alcoholics}
            placeholder={t("form.alcoholic")}
            className={errors.alcoholic ? "form-select error" : "form-select"}
          />
          {errors.alcoholic && (
            <div className="form-error">{errors.alcoholic}</div>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <FormSelect
            name="glass"
            value={form.glass}
            onChange={handleSelectChange}
            options={options.glasses}
            placeholder={t("form.glass")}
            className={errors.glass ? "form-select error" : "form-select"}
          />
          {errors.glass && <div className="form-error">{errors.glass}</div>}
        </div>
        <div className="form-group">
          <FormSelect
            name="ingredients"
            value={form.ingredients}
            onChange={handleMultiSelectChange}
            options={options.ingredients}
            className={errors.ingredients ? "form-select error" : "form-select"}
            multiple
          />
          {errors.ingredients && (
            <div className="form-error">{errors.ingredients}</div>
          )}
        </div>
      </div>
      <div className="form-actions">
        <FormButton text={t("form.back")} type="button" onClick={handleBack} />
        <FormButton text={t("form.next")} type="submit" />
      </div>
    </form>
  );

  // الخطوة الثالثة: مراجعة البيانات
  const renderStep3 = () => (
    <div className="form-card application-form-card">
      <h2 className="form-title">{t("form.review")}</h2>
      <div className="form-review review-box">
        <div>
          <b>{t("form.name")}</b>: {form.name}
        </div>
        <div>
          <b>{t("form.surname")}</b>: {form.surname}
        </div>
        <div>
          <b>{t("form.phone")}</b>: {form.phone}
        </div>
        <div>
          <b>{t("form.email")}</b>: {form.email}
        </div>
        <div>
          <b>{t("form.category")}</b>: {form.category}
        </div>
        <div>
          <b>{t("form.alcoholic")}</b>: {form.alcoholic}
        </div>
        <div>
          <b>{t("form.glass")}</b>: {form.glass}
        </div>
        <div>
          <b>{t("form.ingredients")}</b>: {form.ingredients.join(", ")}
        </div>
      </div>
      <div className="form-actions">
        <FormButton text={t("form.back")} type="button" onClick={handleBack} />
        <FormButton
          text={t("form.confirm")}
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
        />
      </div>
    </div>
  );

  // الخطوة الرابعة: عرض النتيجة في كارد منسق
  const renderStep4 = () => (
    <div className="form-card application-form-card">
      <h2 className="form-title">{t("form.result")}</h2>
      {loading ? (
        <LoadingSpinner />
      ) : drinkResult && drinkResult.length > 0 ? (
        <div className="form-drink-result">
          <Card item={drinkResult[0]} type="drink" />
        </div>
      ) : (
        <div>{t("form.noResult")}</div>
      )}
      <div className="form-actions">
        <FormButton text={t("form.back")} type="button" onClick={handleBack} />
      </div>
    </div>
  );

  // عرض الخطوة الحالية
  return (
    <div className="application-form-outer">
      {/* عرض الخطوة المناسبة */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default ApplicationForm;
