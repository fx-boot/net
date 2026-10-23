import { useLanguage } from '../../i18n/LanguageContext';
import { editorial } from '../../i18n/editorial';
import { useClipboard } from '../../hooks/useClipboard';
export function CopyEmailButton({ email }: { email: string }) {
 const { language, t } = useLanguage();
 const { message, copied, manual, input, copy } = useClipboard(email);
 return <div className="email-copy"><button data-magnetic className="email-button" data-copied={copied} onClick={() => void copy()} aria-label={`${t('copyEmail')} ${email}`}><span className="email-flip" aria-hidden="true"><span className="email-address">{email}</span><span className="email-confirmation"><i className="copy-dot" />[ {editorial[language].copied} ]</span></span></button><span className="sr-only" role="status">{copied ? `[ ${editorial[language].copied} ]` : ''}</span>{manual&&<div className="manual-copy"><p role="status">{message}</p><label>{t('manualCopy')}<input ref={input} value={email} readOnly onFocus={event=>event.target.select()} /></label></div>}</div>;
}
