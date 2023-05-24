import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"
        alt=""
        width="150px"
        height="150px"
      />
      <h1>{t('notFoundPage.title')}</h1>
      <Link className="text-decoration-none" to="/" style={{ color: 'black' }}>{t('notFoundPage.link')}</Link>
    </div>
  );
};
export default NotFoundPage;
