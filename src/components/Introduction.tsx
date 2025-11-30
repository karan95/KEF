import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { motion } from "motion/react";
import { Sun, Moon, Instagram, Facebook, Mail, Phone } from "lucide-react";

/* ------------------ Types ------------------ */
type Testimonial = {
  name: string;
  role: string;
  message: string;
};

/* ------------------ Hook: Counter ------------------ */
function useCountUp(target: number, durationMs = 1500): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}

/* ------------------ Main App ------------------ */
const Introduction: React.FC = () => {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
   document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Roboto'] transition-colors duration-500">
        {/* NAVBAR */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              {/* Replace /logo.png with your real logo */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md">
                <img src="src/assets/logo_white.png" alt="logo" loading="lazy" width={200} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-sm sm:text-base">
                  ક્ષત્રિય સમાજ શિક્ષણ ફાઉન્ડેશન
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  જ્ઞાનથી વિકાસ, વિકાસથી સમાજ
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6 text-sm lg:text-base">
              <TopNavLink to="/">Home</TopNavLink>
              <TopNavLink to="/about">About</TopNavLink>
              <TopNavLink to="/services">Services</TopNavLink>
              <TopNavLink to="/vision">Vision</TopNavLink>
              <TopNavLink to="/contact">Contact</TopNavLink>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark((v) => !v)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-105 transition-transform"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <Sun size={18} className="text-yellow-300" />
              ) : (
                <Moon size={18} className="text-slate-700" />
              )}
            </button>
          </div>
        </nav>

        {/* CONTENT */}
        <main className="pt-20 pb-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/vision" element={<VisionPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-200 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                ક્ષત્રિય સમાજ શિક્ષણ ફાઉન્ડેશન
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                સમાજના વિદ્યાર્થીઓને શિક્ષણ, માર્ગદર્શન, સ્કોલરશિપ અને Soft
                Skills દ્વારા આત્મનિર્ભર અને સફળ બનાવવા માટે સમર્પિત
                શૈક્ષણિક મિશન.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-2">Quick Links</h4>
              <ul className="space-y-1 text-sm text-slate-400">
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/about">About</FooterLink>
                <FooterLink to="/services">Services</FooterLink>
                <FooterLink to="/vision">Vision</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-2">Contact</h4>
              <p className="flex items-center gap-2 text-sm text-slate-300">
                <b>Address:</b> Ahmedabad | Boston, USA
              </p>
              <p className="flex items-center gap-2 text-sm text-slate-300">
                <Phone size={16} /> +1 978-996-xxxx
              </p>
              <p className="flex items-center gap-2 text-sm text-slate-300 mt-1">
                <Mail size={16} /> kshatriyaeducationfoundation@gmail.com
              </p>
              <div className="flex gap-3 mt-3">
                <a
                  href="https://www.instagram.com/kshatriya_education_foundation/"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61584299707474"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 py-3 text-center text-xs text-slate-500">
            © 2025 Kshatriya Samaj Shikshan Foundation — All Rights Reserved
          </div>
        </footer>
      </div>
    </Router>
  );
};

/* ------------------ Top Nav Link ------------------ */
const TopNavLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "relative pb-1",
        "hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
        isActive ? "text-blue-600 dark:text-blue-400" : "",
      ].join(" ")
    }
  >
    {({ isActive }) => (
      <>
        {children}
        {isActive && (
          <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-blue-500" />
        )}
      </>
    )}
  </NavLink>
);

/* ------------------ Footer Link ------------------ */
const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <li>
    <NavLink
      to={to}
      className="hover:text-slate-200 transition-colors duration-150"
    >
      {children}
    </NavLink>
  </li>
);

/* ================== HOME PAGE ================== */
const HomePage: React.FC = () => {
  const count = useCountUp(100000, 1800);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14 grid gap-10 lg:grid-cols-2 items-center">
        {/* Left: Text */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
            શિક્ષણ, માર્ગદર્શન અને{" "}
            <span className="text-blue-600 dark:text-blue-400">
              તક દરેક વિદ્યાર્થી સુધી
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
            ક્ષત્રિય સમાજ શિક્ષણ ફાઉન્ડેશનનો સંકલ્પ — સમાજના વિદ્યાર્થીઓને
            ગુણવત્તાસભર શિક્ષણ, કરિયર માર્ગદર્શન, સ્કોલરશિપ અને Soft Skills
            Training દ્વારા{" "}
            <span className="font-semibold">
              આત્મનિર્ભર અને સફળ જીવન માટે તૈયાર
            </span>{" "}
            કરવાનું.
          </p>

          {/* Counters */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-center">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 py-4 px-3">
              <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {count.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Target students <br /> by 2030
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 py-4 px-3">
              <p className="text-2xl font-extrabold">6+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Key programs <br /> for youth
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 py-4 px-3">
              <p className="text-2xl font-extrabold">Community</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ક્ષત્રિય & ઠાકોર <br /> સમુદાય ફોકસ
              </p>
            </div>
          </div>
        </div>

        {/* Right: Illustration / Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              કરિયર માર્ગદર્શન & સ્કોલરશિપ સહાય
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              <li>• 10th & 12th બાદ યોગ્ય Stream પસંદ કરવાની મદદ</li>
              <li>• Degree, Diploma, Engineering, Medical, IT, Business માટે માર્ગદર્શન</li>
              <li>• UPSC / GPSC / Banking / Police / Defence પરીક્ષાઓ માટે સપોર્ટ</li>
              <li>• આર્થિક રીતે નબળા વિદ્યાર્થીઓ માટે સ્કોલરશિપ સહાય</li>
              <li>• Resume & Interview Preparation, Soft Skills Training</li>
              <li>• ઠાકોર સમુદાયના વિદ્યાર્થીઓને વિશેષ Mentorship</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <TestimonialsSection />
    </motion.div>
  );
};

/* ================== ABOUT PAGE ================== */
const AboutPage: React.FC = () => (
  <motion.section
    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
      અમારી ઓળખ & મિશન
    </h2>
    <div className="space-y-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
      <p>
        <strong>ક્ષત્રિય સમાજ શિક્ષણ ફાઉન્ડેશન</strong> એ એક નિઃસ્વાર્થ,
        સમાજકેન્દ્રિત સંસ્થા છે. અમારી ટીમમાં ડૉક્ટર, ઇજનેર, IT
        પ્રોફેશનલ્સ, સરકારી અધિકારીઓ, ઉદ્યોગસાહસી અને શિક્ષકોનો સમાવેશ થાય
        છે, જે પોતાનો સમય અને અનુભવ સમાજના યુવાનો માટે સમર્પિત કરે છે.
      </p>
      <p>
        અમારું મુખ્ય મિશન —{" "}
        <strong>
          “સમાજના દરેક વિદ્યાર્થીને યોગ્ય માર્ગદર્શન, ગુણવત્તાસભર શિક્ષણ અને
          તક”
        </strong>{" "}
        મળી રહે તે સુનિશ્ચિત કરવાનું છે.
      </p>
      <p>
        ખાસ કરીને ઠાકોર અને ક્ષત્રિય સમાજના બાળકોને, જેમને ઘણી વખત માહિતી,
        Guidance અને Resources ના અભાવે તક ગુમાવવી પડે છે, તેમને
        <strong> Career Roadmap, Mentorship અને Scholarship</strong>થી
        સશક્ત બનાવવાનો અમારો સંકલ્પ છે.
      </p>
    </div>
  </motion.section>
);

/* ================== SERVICES PAGE ================== */
const ServicesPage: React.FC = () => {
  const services = [
    {
      title: "વિદ્યાર્થી રજીસ્ટ્રી",
      desc: "સમાજના વિદ્યાર્થીઓનો Central ડેટાબેઝ, જેથી માર્ગદર્શન, સ્કોલરશિપ અને Career Support યોગ્ય વિદ્યાર્થીઓ સુધી પહોંચી શકે.",
    },
    {
      title: "સ્કોલરશિપ સહાય",
      desc: "આર્થિક રીતે નબળા પરંતુ પ્રતિભાશાળી વિદ્યાર્થીઓ માટે ફી સહાય, Books, Coaching Support અને Merit + Need-based સ્કોલરશિપ.",
    },
    {
      title: "કરિયર માર્ગદર્શન",
      desc: "10th/12th બાદ Stream Selection, Course Guidance, College Selection, IT, Engineering, Medical, Government Jobs વગેરે માટે Mentorship.",
    },
    {
      title: "સ્પર્ધાત્મક પરીક્ષા કોચિંગ",
      desc: "UPSC, GPSC, Banking, SSC, Police, Defence જેવી પરીક્ષાઓ માટે Orientation, Materials અને Guiding Sessions.",
    },
    {
      title: "Soft Skills Training",
      desc: "Resume બનાવવું, Interview Crack કરવું, Public Speaking, Communication Skills અને Personality Development Workshops.",
    },
    {
      title: "મહિલા શિક્ષણ સપોર્ટ",
      desc: "Girls Education માટે Awareness, Safety Workshops, Higher Study Guidance અને Women Career Mentorship.",
    },
  ];

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10">
        અમારી સેવાઓ
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <motion.div
            key={s.title}
            whileHover={{ translateY: -4 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-3"
          >
            <h3 className="font-semibold text-lg">{s.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

/* ================== VISION PAGE ================== */
const VisionPage: React.FC = () => (
  <motion.section
    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
      Vision 2030
    </h2>
    <div className="space-y-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
      <p>
        <strong>Vision 2030:</strong> 100,000+ વિદ્યાર્થીઓને Direct અથવા
        Indirect રીતે શિક્ષણ, સ્કોલરશિપ, માર્ગદર્શન, Training અને Networking
        Opportunities સાથે જોડવા.
      </p>
      <p>
        Yearly Education Summits, Career Guidance Camps, Scholarship Drives અને
        Mentorship Circles દ્વારા સમાજને શૈક્ષણિક રીતે મજબૂત બનાવવાનું અમારું
        Long-Term Vision છે.
      </p>
      <p>
        અમારી માન્યતા સાદી છે —{" "}
        <strong>“સમાજનો વિકાસ એક એક શિક્ષિત અને સશક્ત યુવાનથી શરૂ થાય છે.”</strong>
      </p>
    </div>
  </motion.section>
);

/* ================== CONTACT PAGE ================== */
const ContactPage: React.FC = () => {
  return (
    <motion.section
      className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
        સંપર્ક કરો
      </h2>
      <p className="text-center text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
        જો તમે વિદ્યાર્થી, માતા-પિતા, Mentor અથવા Sponsor તરીકે જોડાવા ઈચ્છો
        છો, તો નીચેનો ફોર્મ ભરી reach out કરો.
      </p>

      <form
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you! (Hook this up to EmailJS / backend later.)");
        }}
      >
        <div>
          <label className="block text-sm mb-1">તમારું નામ</label>
          <input
            required
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="student"
          >
            <option value="student">વિદ્યાર્થી</option>
            <option value="parent">માતા-પિતા</option>
            <option value="mentor">Mentor</option>
            <option value="donor">Sponsor / Donor</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">તમારો સંદેશ</label>
          <textarea
            required
            rows={4}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
          disabled={true}
        >
          {/* મોકલો */}
          Coming Soon...
        </button>
      </form>
    </motion.section>
  );
};

/* ================== TESTIMONIAL SECTION ================== */
const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "યુવરાજ ઠાકોર",
      role: "Software Engineering Student",
      message:
        "કરિયર માર્ગદર્શન સેશનથી મને યોગ્ય branch અને college પસંદ કરવામાં ખુબ મદદ મળી. હવે હું clear goal સાથે study કરું છું.",
    },
    {
      name: "પ્રિયા ઠાકોર",
      role: "B.Com + Banking Aspirant",
      message:
        "સ્કોલરશિપ સહાય અને Mentorship ના કારણે મને Coaching ચાલુ રાખવી સરળ બની. Foundation વગર હું કદાચ છોડીને બેઠી હોત.",
    },
    {
      name: "માતા-પિતા (ઠાકોર સમુદાય)",
      role: "Parent",
      message:
        "અમે village પરથી છીએ, પરંતુ અમારા બાળકને Guidance & Support મળી રહ્યું છે. હવે અમને પણ લાગે છે કે એ મોટું કંઈક કરી શકે છે.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % testimonials.length),
      4000
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  const t = testimonials[index];

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h3 className="text-xl font-semibold text-center mb-4">
        સમાજના અવાજ (Testimonials)
      </h3>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6"
      >
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic mb-4">
          “{t.message}”
        </p>
        <p className="text-sm font-semibold">{t.name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              type="button"
              style={{
                width: 20
              }}
              key={i}
              onClick={() => setIndex(i)}
              className={[
                "w-2.5 h-2.5 rounded-full",
                i === index
                  ? "bg-blue-500"
                  : "bg-slate-300 dark:bg-slate-600",
              ].join(" ")}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Introduction;
