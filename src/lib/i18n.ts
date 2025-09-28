import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ro: {
    translation: {
      appName: "Glyco",
      heroTitle: "Rețete sănătoase pentru un stil de viață echilibrat",
      heroSubtitle: "Meniuri pe categorii de afecțiuni, verificate și prietenoase.",
      ctaStart: "Începe acum",
      login: "Autentificare",
      signup: "Înregistrare",
      categories: "Categorii",
      medicalTips: "Sfaturi medicale",
      blog: "Articole",
      contact: "Contact",
      about: "Despre noi",
      disclaimer: "Disclaimer medical",
      account: "Cont",
      search: "Căutare",
      favorites: "Favorite",
      premium: "Premium"
    }
  },
  en: {
    translation: {
      appName: "Glyco",
      heroTitle: "Healthy recipes for a balanced lifestyle",
      heroSubtitle: "Menus by health categories, verified and friendly.",
      ctaStart: "Start now",
      login: "Login",
      signup: "Sign Up",
      categories: "Categories",
      medicalTips: "Medical tips",
      blog: "Blog",
      contact: "Contact",
      about: "About us",
      disclaimer: "Medical disclaimer",
      account: "Account",
      search: "Search",
      favorites: "Favorites",
      premium: "Premium"
    }
  },
  es: {
    translation: {
      appName: "Glyco",
      heroTitle: "Recetas saludables para un estilo de vida equilibrado",
      heroSubtitle: "Menús por categorías de salud, verificados y amigables.",
      ctaStart: "Comienza ahora",
      login: "Iniciar sesión",
      signup: "Registrarse",
      categories: "Categorías",
      medicalTips: "Consejos médicos",
      blog: "Artículos",
      contact: "Contacto",
      about: "Sobre nosotros",
      disclaimer: "Aviso médico",
      account: "Cuenta",
      search: "Buscar",
      favorites: "Favoritos",
      premium: "Premium"
    }
  },
  fr: {
    translation: {
      appName: "Glyco",
      heroTitle: "Recettes saines pour un mode de vie équilibré",
      heroSubtitle: "Menus par catégories de santé, vérifiés et conviviaux.",
      ctaStart: "Commencez maintenant",
      login: "Connexion",
      signup: "S'inscrire",
      categories: "Catégories",
      medicalTips: "Conseils médicaux",
      blog: "Articles",
      contact: "Contact",
      about: "À propos de nous",
      disclaimer: "Avertissement médical",
      account: "Compte",
      search: "Recherche",
      favorites: "Favoris",
      premium: "Premium"
    }
  },
  ru: {
    translation: {
      appName: "Glyco",
      heroTitle: "Полезные рецепты для сбалансированного образа жизни",
      heroSubtitle: "Меню по категориям заболеваний, проверенные и удобные.",
      ctaStart: "Начать сейчас",
      login: "Вход",
      signup: "Регистрация",
      categories: "Категории",
      medicalTips: "Медицинские советы",
      blog: "Статьи",
      contact: "Контакты",
      about: "О нас",
      disclaimer: "Медицинский отказ",
      account: "Аккаунт",
      search: "Поиск",
      favorites: "Избранное",
      premium: "Премиум"
    }
  },
  ar: {
    translation: {
      appName: "Glyco",
      heroTitle: "وصفات صحية لنمط حياة متوازن",
      heroSubtitle: "قوائم حسب الفئات الصحية، تم التحقق منها وسهلة الاستخدام.",
      ctaStart: "ابدأ الآن",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      categories: "الفئات",
      medicalTips: "نصائح طبية",
      blog: "مقالات",
      contact: "اتصل بنا",
      about: "معلومات عنا",
      disclaimer: "إخلاء المسؤولية الطبية",
      account: "الحساب",
      search: "بحث",
      favorites: "المفضلة",
      premium: "بريميوم"
    }
  },
  zh: {
    translation: {
      appName: "Glyco",
      heroTitle: "健康食谱，平衡生活方式",
      heroSubtitle: "按健康类别划分的菜单，经过验证，简单友好。",
      ctaStart: "立即开始",
      login: "登录",
      signup: "注册",
      categories: "类别",
      medicalTips: "医学提示",
      blog: "文章",
      contact: "联系我们",
      about: "关于我们",
      disclaimer: "医学免责声明",
      account: "账户",
      search: "搜索",
      favorites: "收藏夹",
      premium: "高级"
    }
  },
  hi: {
    translation: {
      appName: "Glyco",
      heroTitle: "संतुलित जीवनशैली के लिए स्वस्थ रेसिपी",
      heroSubtitle: "स्वास्थ्य श्रेणियों के अनुसार मेनू, सत्यापित और आसान।",
      ctaStart: "अभी शुरू करें",
      login: "लॉगिन",
      signup: "साइन अप",
      categories: "श्रेणियाँ",
      medicalTips: "चिकित्सीय सुझाव",
      blog: "लेख",
      contact: "संपर्क करें",
      about: "हमारे बारे में",
      disclaimer: "चिकित्सीय अस्वीकरण",
      account: "खाता",
      search: "खोज",
      favorites: "पसंदीदा",
      premium: "प्रीमियम"
    }
  },
  ur: {
    translation: {
      appName: "Glyco",
      heroTitle: "متوازن طرز زندگی کے لئے صحت مند ترکیبیں",
      heroSubtitle: "صحت کی زمروں کے لحاظ سے مینو، تصدیق شدہ اور آسان۔",
      ctaStart: "ابھی شروع کریں",
      login: "لاگ ان",
      signup: "سائن اپ",
      categories: "زمرے",
      medicalTips: "طبی مشورے",
      blog: "مضامین",
      contact: "رابطہ کریں",
      about: "ہمارے بارے میں",
      disclaimer: "طبی دستبرداری",
      account: "اکاؤنٹ",
      search: "تلاش کریں",
      favorites: "پسندیدہ",
      premium: "پریمیم"
    }
  }
};

export function initI18n(lng: string = "ro") {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng,
      fallbackLng: "en",
      interpolation: { escapeValue: false }
    });
  }
  return i18n;
}
