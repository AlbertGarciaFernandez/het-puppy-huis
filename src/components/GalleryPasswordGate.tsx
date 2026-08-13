import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { getPasswordInputType } from "@/lib/password-visibility";

type GalleryPasswordGateProps = {
  title: string;
  description: string;
  coverImageUrl: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  onSubmit: (password: string) => Promise<void> | void;
};

export default function GalleryPasswordGate({
  title,
  description,
  coverImageUrl,
  errorMessage,
  isSubmitting,
  onSubmit,
}: GalleryPasswordGateProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/80 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0">
        <img src={coverImageUrl} alt={title} className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.18),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(255,0,255,0.18),_transparent_40%)]" />
      </div>

      <div className="relative grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">
            <LockKeyhole className="h-4 w-4" />
            Private Album
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-gray-300 sm:text-lg">{description}</p>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-gray-500">
            Access expires automatically after 45 minutes.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const password = String(formData.get("password") ?? "").trim();
            await onSubmit(password);
          }}
          className="rounded-[1.75rem] border border-white/10 bg-black/65 p-6 backdrop-blur-xl sm:p-8"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neon-pink">Enter Album</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Password required</h2>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              Each album has its own password. Once unlocked, this browser keeps access for 45 minutes.
            </p>
          </div>

          <label className="mt-8 block text-xs font-semibold uppercase tracking-[0.28em] text-gray-500" htmlFor="gallery-password">
            Album password
          </label>
          <div className="relative mt-3">
            <input
              id="gallery-password"
              name="password"
              type={getPasswordInputType(isPasswordVisible)}
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 pr-14 text-base text-white outline-none transition focus:border-neon-blue focus:bg-white/8"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              aria-pressed={isPasswordVisible}
            >
              {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {errorMessage ? <p className="mt-4 text-sm text-rose-400">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-neon-pink px-6 py-4 text-sm font-bold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Unlocking..." : "Unlock Album"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
