import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import withHeaderView from './WithHeaderView';
import HeaderNav from './HeaderNav';

import { langUpdate } from '../../store/slices/header/slice';
import { selectorLoadingShoes, selectorSearchValue } from '../../store/slices/shoes/selectors';
import { selectorHeaderMenu, selectorLang } from '../../store/slices/header/selectors';
import { useGetShoesQuery } from '../../store/apis/shoes';

import logo from '../../assets/icons/logo.png';
import buy from '../../assets/icons/buy-icon.png';
import search from '../../assets/icons/search-icon.png';

import './sass/Header.scss';

function HeaderView({
  onShowNavMenu, onValidateSearch, classMenu, 
}) {
  const {
    refetch,
  } = useGetShoesQuery();
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const loadingShoes = useSelector(selectorLoadingShoes);
  const searchValue = useSelector(selectorSearchValue);
  const headerMenu = useSelector(selectorHeaderMenu);
  const lang = useSelector(selectorLang);

  const menuItems = headerMenu.slice();
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <p className="header__logo_title">
            nike
          </p>
          <img className="header__logo_icon" src={logo} alt="logo" />
          <button 
            type="button"
            onClick={refetch}
            className={`header__logo_update ${loadingShoes ? 'load' : ''}`}
          >
            <span>
              update
            </span>
          </button>
        </div>
        <nav className="header__nav">
          <div 
            onClick={onShowNavMenu}
            aria-hidden="true"
            className="header__nav_btn"
          />
          <ul className={`menu ${classMenu ? 'activity' : ''}`}>
            {
            menuItems.map(({ name, id }) => (
              <HeaderNav 
                key={id}
                name={name}
              />
            ))
            }
            <form className="menu_search" action="#">
              <input 
                onChange={(e) => onValidateSearch(e)} 
                value={searchValue} 
                placeholder={t('header.search.placeholder')} 
                type="text" 
                className="menu_search_input"
              />
              <input 
                onClick={(e) => e.preventDefault()} 
                className="menu_search_submit" 
                type="image" 
                alt="submit" 
                src={search}
              />
            </form>
            <div className="menu_buy">
              <a onClick={(e) => e.preventDefault()} href="#top">
                <img src={buy} alt="buy_icon" />
              </a>
            </div>
            <div className="menu_lang">
              <label htmlFor="english">
                {t('header.lang.en')}
                <input 
                  type="radio" 
                  id="english"
                  name="en"
                  value="en"
                  className="menu_lang_input"
                  checked={lang === 'en'}
                  onChange={(e) => dispatch(langUpdate({ 
                    localLng: i18n,
                    target: e.currentTarget.value,
                  }))}
                />
              </label>
              <label htmlFor="ukraine">
                {t('header.lang.ua')}
                <input 
                  type="radio" 
                  id="ukraine"
                  name="ua"
                  value="ua"
                  className="menu_lang_input"
                  checked={lang === 'ua'}
                  onChange={(e) => dispatch(langUpdate({ 
                    localLng: i18n,
                    target: e.currentTarget.value,
                  }))}
                />
              </label>

            </div>
          </ul>
        </nav>
      </div>
      <Outlet />
    </header>
  );
}

HeaderView.propTypes = {
  onValidateSearch: PropTypes.func.isRequired,
  onShowNavMenu: PropTypes.func.isRequired,
  classMenu: PropTypes.bool.isRequired
};

export default withHeaderView(HeaderView);
