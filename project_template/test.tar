--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adres; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.adres (
    osoba_id integer NOT NULL,
    ulica character varying(255) NOT NULL,
    numer_domu character varying(255) NOT NULL,
    numer_mieszkania character varying(255) NOT NULL,
    kod_pocztowy character varying(255) NOT NULL,
    miasto character varying(255) NOT NULL,
    kraj character varying(255) NOT NULL
);


ALTER TABLE public.adres OWNER TO dzang;

--
-- Name: bagaz; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.bagaz (
    bagaz_id integer NOT NULL,
    typ_bagazu character varying(255) NOT NULL,
    waga character varying(255),
    wymiary character varying(255) NOT NULL,
    cena double precision
);


ALTER TABLE public.bagaz OWNER TO dzang;

--
-- Name: bagaz_bagaz_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.bagaz_bagaz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bagaz_bagaz_id_seq OWNER TO dzang;

--
-- Name: bagaz_bagaz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.bagaz_bagaz_id_seq OWNED BY public.bagaz.bagaz_id;


--
-- Name: bagaz_pasazer; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.bagaz_pasazer (
    bagaz_pasazer_id integer NOT NULL,
    bagazbagaz_id integer NOT NULL,
    pasazerpasazer_id integer NOT NULL
);


ALTER TABLE public.bagaz_pasazer OWNER TO dzang;

--
-- Name: bagaz_pasazer_bagaz_pasazer_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.bagaz_pasazer_bagaz_pasazer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bagaz_pasazer_bagaz_pasazer_id_seq OWNER TO dzang;

--
-- Name: bagaz_pasazer_bagaz_pasazer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.bagaz_pasazer_bagaz_pasazer_id_seq OWNED BY public.bagaz_pasazer.bagaz_pasazer_id;


--
-- Name: bilet; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.bilet (
    bilet_id integer NOT NULL,
    uzytkownik_id integer NOT NULL,
    lot_id integer NOT NULL,
    kod character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    cena double precision
);


ALTER TABLE public.bilet OWNER TO dzang;

--
-- Name: COLUMN bilet.kod; Type: COMMENT; Schema: public; Owner: dzang
--

COMMENT ON COLUMN public.bilet.kod IS 'Krótki kod biletu określający informacje o locie';


--
-- Name: bilet_bilet_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.bilet_bilet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bilet_bilet_id_seq OWNER TO dzang;

--
-- Name: bilet_bilet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.bilet_bilet_id_seq OWNED BY public.bilet.bilet_id;


--
-- Name: cennik; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.cennik (
    cennik_id integer NOT NULL,
    klasa character varying(255) NOT NULL,
    cena integer NOT NULL,
    znizka_id integer
);


ALTER TABLE public.cennik OWNER TO dzang;

--
-- Name: cennik_cennik_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.cennik_cennik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cennik_cennik_id_seq OWNER TO dzang;

--
-- Name: cennik_cennik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.cennik_cennik_id_seq OWNED BY public.cennik.cennik_id;


--
-- Name: lot; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.lot (
    lot_id integer NOT NULL,
    cennik_id integer NOT NULL,
    zaloga_id integer NOT NULL,
    lotnisko_wylotu_id integer NOT NULL,
    lotnisko_przylotu_id integer NOT NULL,
    status character varying(255) NOT NULL,
    data_wylotu timestamp without time zone NOT NULL,
    data_przylotu timestamp without time zone NOT NULL,
    kod_lotu character varying(50)
);


ALTER TABLE public.lot OWNER TO dzang;

--
-- Name: lot_lot_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.lot_lot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lot_lot_id_seq OWNER TO dzang;

--
-- Name: lot_lot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.lot_lot_id_seq OWNED BY public.lot.lot_id;


--
-- Name: lot_szczegoly; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.lot_szczegoly (
    lot_id integer NOT NULL,
    samolot_id integer NOT NULL,
    opoznienie integer,
    kod_bramki character varying(255) NOT NULL,
    liczba_wolnych_miejsc integer NOT NULL
);


ALTER TABLE public.lot_szczegoly OWNER TO dzang;

--
-- Name: COLUMN lot_szczegoly.opoznienie; Type: COMMENT; Schema: public; Owner: dzang
--

COMMENT ON COLUMN public.lot_szczegoly.opoznienie IS 'Opóźnienie w minutach.';


--
-- Name: COLUMN lot_szczegoly.kod_bramki; Type: COMMENT; Schema: public; Owner: dzang
--

COMMENT ON COLUMN public.lot_szczegoly.kod_bramki IS 'Numer bramki na lotnisku';


--
-- Name: lotnisko; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.lotnisko (
    lotnisko_id integer NOT NULL,
    kod_iata character varying(10) NOT NULL,
    nazwa character varying(255) NOT NULL
);


ALTER TABLE public.lotnisko OWNER TO dzang;

--
-- Name: lotnisko_lotnisko_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.lotnisko_lotnisko_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lotnisko_lotnisko_id_seq OWNER TO dzang;

--
-- Name: lotnisko_lotnisko_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.lotnisko_lotnisko_id_seq OWNED BY public.lotnisko.lotnisko_id;


--
-- Name: osoba; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.osoba (
    osoba_id integer NOT NULL,
    imie character varying(255) NOT NULL,
    nazwisko character varying(255) NOT NULL,
    pesel character varying(255),
    nr_tel character varying(255),
    wiek character varying(100)
);


ALTER TABLE public.osoba OWNER TO dzang;

--
-- Name: osoba_osoba_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.osoba_osoba_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.osoba_osoba_id_seq OWNER TO dzang;

--
-- Name: osoba_osoba_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.osoba_osoba_id_seq OWNED BY public.osoba.osoba_id;


--
-- Name: pasazer; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.pasazer (
    pasazer_id integer NOT NULL,
    bilet_id integer NOT NULL,
    siedzenie_id integer NOT NULL,
    imie character varying(255) NOT NULL,
    nazwisko character varying(255) NOT NULL,
    wiek character varying(255) NOT NULL
);


ALTER TABLE public.pasazer OWNER TO dzang;

--
-- Name: pasazer_pasazer_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.pasazer_pasazer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pasazer_pasazer_id_seq OWNER TO dzang;

--
-- Name: pasazer_pasazer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.pasazer_pasazer_id_seq OWNED BY public.pasazer.pasazer_id;


--
-- Name: pasazer_uslugi_dodatkowe; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.pasazer_uslugi_dodatkowe (
    pasazer_uslugi_dodatkowe_id integer NOT NULL,
    pasazer_id integer NOT NULL,
    id_uslugi integer NOT NULL
);


ALTER TABLE public.pasazer_uslugi_dodatkowe OWNER TO dzang;

--
-- Name: pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq OWNER TO dzang;

--
-- Name: pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq OWNED BY public.pasazer_uslugi_dodatkowe.pasazer_uslugi_dodatkowe_id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.role (
    rola_id integer NOT NULL,
    nazwa character varying(255) NOT NULL
);


ALTER TABLE public.role OWNER TO dzang;

--
-- Name: role_rola_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.role_rola_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_rola_id_seq OWNER TO dzang;

--
-- Name: role_rola_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.role_rola_id_seq OWNED BY public.role.rola_id;


--
-- Name: role_uprawnienia; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.role_uprawnienia (
    rolerola_id integer NOT NULL,
    uprawnieniauprawnienia_id integer NOT NULL
);


ALTER TABLE public.role_uprawnienia OWNER TO dzang;

--
-- Name: samolot; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.samolot (
    samolot_id integer NOT NULL,
    model character varying(255) NOT NULL,
    linia_lotnicza character varying(255) NOT NULL,
    liczba_miejsc integer NOT NULL
);


ALTER TABLE public.samolot OWNER TO dzang;

--
-- Name: samolot_samolot_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.samolot_samolot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.samolot_samolot_id_seq OWNER TO dzang;

--
-- Name: samolot_samolot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.samolot_samolot_id_seq OWNED BY public.samolot.samolot_id;


--
-- Name: siedzenie; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.siedzenie (
    siedzenie_id integer NOT NULL,
    samolot_id integer NOT NULL,
    nazwa_siedzenia character varying(255) NOT NULL,
    status character varying(255)
);


ALTER TABLE public.siedzenie OWNER TO dzang;

--
-- Name: siedzenie_siedzenie_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.siedzenie_siedzenie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.siedzenie_siedzenie_id_seq OWNER TO dzang;

--
-- Name: siedzenie_siedzenie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.siedzenie_siedzenie_id_seq OWNED BY public.siedzenie.siedzenie_id;


--
-- Name: uprawnienia; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.uprawnienia (
    uprawnienia_id integer NOT NULL,
    kod character varying(255) NOT NULL,
    nazwa character varying(255) NOT NULL,
    opis character varying(255)
);


ALTER TABLE public.uprawnienia OWNER TO dzang;

--
-- Name: uprawnienia_uprawnienia_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.uprawnienia_uprawnienia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uprawnienia_uprawnienia_id_seq OWNER TO dzang;

--
-- Name: uprawnienia_uprawnienia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.uprawnienia_uprawnienia_id_seq OWNED BY public.uprawnienia.uprawnienia_id;


--
-- Name: uslugi_dodatkowe; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.uslugi_dodatkowe (
    id_uslugi integer NOT NULL,
    nazwa character varying(255) NOT NULL,
    cena double precision
);


ALTER TABLE public.uslugi_dodatkowe OWNER TO dzang;

--
-- Name: uslugi_dodatkowe_id_uslugi_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.uslugi_dodatkowe_id_uslugi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uslugi_dodatkowe_id_uslugi_seq OWNER TO dzang;

--
-- Name: uslugi_dodatkowe_id_uslugi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.uslugi_dodatkowe_id_uslugi_seq OWNED BY public.uslugi_dodatkowe.id_uslugi;


--
-- Name: uzytkownik; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.uzytkownik (
    uzytkownik_id integer NOT NULL,
    id_osoba integer NOT NULL,
    email character varying(255) NOT NULL,
    haslo character varying(255) NOT NULL,
    salt character varying(255),
    jwt character varying(255)
);


ALTER TABLE public.uzytkownik OWNER TO dzang;

--
-- Name: uzytkownik_role; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.uzytkownik_role (
    uzytkownikuzytkownik_id integer NOT NULL,
    rolerola_id integer NOT NULL
);


ALTER TABLE public.uzytkownik_role OWNER TO dzang;

--
-- Name: uzytkownik_uzytkownik_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.uzytkownik_uzytkownik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uzytkownik_uzytkownik_id_seq OWNER TO dzang;

--
-- Name: uzytkownik_uzytkownik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.uzytkownik_uzytkownik_id_seq OWNED BY public.uzytkownik.uzytkownik_id;


--
-- Name: zaloga; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.zaloga (
    zaloga_id integer NOT NULL,
    ilosc_osob integer NOT NULL
);


ALTER TABLE public.zaloga OWNER TO dzang;

--
-- Name: zaloga_uzytkownik; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.zaloga_uzytkownik (
    zalogazaloga_id integer NOT NULL,
    uzytkownikuzytkownik_id integer NOT NULL
);


ALTER TABLE public.zaloga_uzytkownik OWNER TO dzang;

--
-- Name: zaloga_zaloga_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.zaloga_zaloga_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zaloga_zaloga_id_seq OWNER TO dzang;

--
-- Name: zaloga_zaloga_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.zaloga_zaloga_id_seq OWNED BY public.zaloga.zaloga_id;


--
-- Name: znizka; Type: TABLE; Schema: public; Owner: dzang
--

CREATE TABLE public.znizka (
    znizka_id integer NOT NULL,
    wartosc integer NOT NULL,
    nazwa character varying(255) NOT NULL
);


ALTER TABLE public.znizka OWNER TO dzang;

--
-- Name: znizka_znizka_id_seq; Type: SEQUENCE; Schema: public; Owner: dzang
--

CREATE SEQUENCE public.znizka_znizka_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.znizka_znizka_id_seq OWNER TO dzang;

--
-- Name: znizka_znizka_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dzang
--

ALTER SEQUENCE public.znizka_znizka_id_seq OWNED BY public.znizka.znizka_id;


--
-- Name: bagaz bagaz_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bagaz ALTER COLUMN bagaz_id SET DEFAULT nextval('public.bagaz_bagaz_id_seq'::regclass);


--
-- Name: bagaz_pasazer bagaz_pasazer_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bagaz_pasazer ALTER COLUMN bagaz_pasazer_id SET DEFAULT nextval('public.bagaz_pasazer_bagaz_pasazer_id_seq'::regclass);


--
-- Name: bilet bilet_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bilet ALTER COLUMN bilet_id SET DEFAULT nextval('public.bilet_bilet_id_seq'::regclass);


--
-- Name: cennik cennik_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.cennik ALTER COLUMN cennik_id SET DEFAULT nextval('public.cennik_cennik_id_seq'::regclass);


--
-- Name: lot lot_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot ALTER COLUMN lot_id SET DEFAULT nextval('public.lot_lot_id_seq'::regclass);


--
-- Name: lotnisko lotnisko_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lotnisko ALTER COLUMN lotnisko_id SET DEFAULT nextval('public.lotnisko_lotnisko_id_seq'::regclass);


--
-- Name: osoba osoba_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.osoba ALTER COLUMN osoba_id SET DEFAULT nextval('public.osoba_osoba_id_seq'::regclass);


--
-- Name: pasazer pasazer_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.pasazer ALTER COLUMN pasazer_id SET DEFAULT nextval('public.pasazer_pasazer_id_seq'::regclass);


--
-- Name: pasazer_uslugi_dodatkowe pasazer_uslugi_dodatkowe_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe ALTER COLUMN pasazer_uslugi_dodatkowe_id SET DEFAULT nextval('public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq'::regclass);


--
-- Name: role rola_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.role ALTER COLUMN rola_id SET DEFAULT nextval('public.role_rola_id_seq'::regclass);


--
-- Name: samolot samolot_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.samolot ALTER COLUMN samolot_id SET DEFAULT nextval('public.samolot_samolot_id_seq'::regclass);


--
-- Name: siedzenie siedzenie_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.siedzenie ALTER COLUMN siedzenie_id SET DEFAULT nextval('public.siedzenie_siedzenie_id_seq'::regclass);


--
-- Name: uprawnienia uprawnienia_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uprawnienia ALTER COLUMN uprawnienia_id SET DEFAULT nextval('public.uprawnienia_uprawnienia_id_seq'::regclass);


--
-- Name: uslugi_dodatkowe id_uslugi; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uslugi_dodatkowe ALTER COLUMN id_uslugi SET DEFAULT nextval('public.uslugi_dodatkowe_id_uslugi_seq'::regclass);


--
-- Name: uzytkownik uzytkownik_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uzytkownik ALTER COLUMN uzytkownik_id SET DEFAULT nextval('public.uzytkownik_uzytkownik_id_seq'::regclass);


--
-- Name: zaloga zaloga_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.zaloga ALTER COLUMN zaloga_id SET DEFAULT nextval('public.zaloga_zaloga_id_seq'::regclass);


--
-- Name: znizka znizka_id; Type: DEFAULT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.znizka ALTER COLUMN znizka_id SET DEFAULT nextval('public.znizka_znizka_id_seq'::regclass);


--
-- Name: adres adres_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.adres
    ADD CONSTRAINT adres_pkey PRIMARY KEY (osoba_id);


--
-- Name: bagaz_pasazer bagaz_pasazer_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bagaz_pasazer
    ADD CONSTRAINT bagaz_pasazer_pkey PRIMARY KEY (bagaz_pasazer_id);


--
-- Name: bagaz bagaz_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bagaz
    ADD CONSTRAINT bagaz_pkey PRIMARY KEY (bagaz_id);


--
-- Name: bilet bilet_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bilet
    ADD CONSTRAINT bilet_pkey PRIMARY KEY (bilet_id);


--
-- Name: cennik cennik_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.cennik
    ADD CONSTRAINT cennik_pkey PRIMARY KEY (cennik_id);


--
-- Name: osoba id_klienta; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT id_klienta PRIMARY KEY (osoba_id);


--
-- Name: lot lot_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot
    ADD CONSTRAINT lot_pkey PRIMARY KEY (lot_id);


--
-- Name: lot_szczegoly lot_szczegoly_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot_szczegoly
    ADD CONSTRAINT lot_szczegoly_pkey PRIMARY KEY (lot_id);


--
-- Name: lotnisko lotnisko_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lotnisko
    ADD CONSTRAINT lotnisko_pkey PRIMARY KEY (lotnisko_id);


--
-- Name: pasazer pasazer_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.pasazer
    ADD CONSTRAINT pasazer_pkey PRIMARY KEY (pasazer_id);


--
-- Name: pasazer_uslugi_dodatkowe pasazer_uslugi_dodatkowe_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe
    ADD CONSTRAINT pasazer_uslugi_dodatkowe_pkey PRIMARY KEY (pasazer_uslugi_dodatkowe_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (rola_id);


--
-- Name: role_uprawnienia role_uprawnienia_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.role_uprawnienia
    ADD CONSTRAINT role_uprawnienia_pkey PRIMARY KEY (rolerola_id, uprawnieniauprawnienia_id);


--
-- Name: samolot samolot_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.samolot
    ADD CONSTRAINT samolot_pkey PRIMARY KEY (samolot_id);


--
-- Name: siedzenie siedzenie_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.siedzenie
    ADD CONSTRAINT siedzenie_pkey PRIMARY KEY (siedzenie_id);


--
-- Name: uprawnienia uprawnienia_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uprawnienia
    ADD CONSTRAINT uprawnienia_pkey PRIMARY KEY (uprawnienia_id);


--
-- Name: uslugi_dodatkowe uslugi_dodatkowe_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uslugi_dodatkowe
    ADD CONSTRAINT uslugi_dodatkowe_pkey PRIMARY KEY (id_uslugi);


--
-- Name: uzytkownik uzytkownik_email_key; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_email_key UNIQUE (email);


--
-- Name: uzytkownik uzytkownik_id_osoba_key; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_id_osoba_key UNIQUE (id_osoba);


--
-- Name: uzytkownik uzytkownik_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_pkey PRIMARY KEY (uzytkownik_id);


--
-- Name: uzytkownik_role uzytkownik_role_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uzytkownik_role
    ADD CONSTRAINT uzytkownik_role_pkey PRIMARY KEY (uzytkownikuzytkownik_id, rolerola_id);


--
-- Name: zaloga zaloga_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.zaloga
    ADD CONSTRAINT zaloga_pkey PRIMARY KEY (zaloga_id);


--
-- Name: zaloga_uzytkownik zaloga_uzytkownik_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.zaloga_uzytkownik
    ADD CONSTRAINT zaloga_uzytkownik_pkey PRIMARY KEY (zalogazaloga_id, uzytkownikuzytkownik_id);


--
-- Name: znizka znizka_pkey; Type: CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.znizka
    ADD CONSTRAINT znizka_pkey PRIMARY KEY (znizka_id);


--
-- Name: adres_osoba_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX adres_osoba_id ON public.adres USING btree (osoba_id);


--
-- Name: bagaz_bagaz_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX bagaz_bagaz_id ON public.bagaz USING btree (bagaz_id);


--
-- Name: bagaz_pasazer_bagaz_pasazer_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX bagaz_pasazer_bagaz_pasazer_id ON public.bagaz_pasazer USING btree (bagaz_pasazer_id);


--
-- Name: bilet_bilet_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX bilet_bilet_id ON public.bilet USING btree (bilet_id);


--
-- Name: cennik_cennik_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX cennik_cennik_id ON public.cennik USING btree (cennik_id);


--
-- Name: lot_lot_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX lot_lot_id ON public.lot USING btree (lot_id);


--
-- Name: lot_szczegoly_lot_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX lot_szczegoly_lot_id ON public.lot_szczegoly USING btree (lot_id);


--
-- Name: lotnisko_lotnisko_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX lotnisko_lotnisko_id ON public.lotnisko USING btree (lotnisko_id);


--
-- Name: osoba_osoba_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX osoba_osoba_id ON public.osoba USING btree (osoba_id);


--
-- Name: pasazer_pasazer_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX pasazer_pasazer_id ON public.pasazer USING btree (pasazer_id);


--
-- Name: pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id ON public.pasazer_uslugi_dodatkowe USING btree (pasazer_uslugi_dodatkowe_id);


--
-- Name: role_rola_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX role_rola_id ON public.role USING btree (rola_id);


--
-- Name: samolot_samolot_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX samolot_samolot_id ON public.samolot USING btree (samolot_id);


--
-- Name: siedzenie_siedzenie_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX siedzenie_siedzenie_id ON public.siedzenie USING btree (siedzenie_id);


--
-- Name: uprawnienia_uprawnienia_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX uprawnienia_uprawnienia_id ON public.uprawnienia USING btree (uprawnienia_id);


--
-- Name: uslugi_dodatkowe_id_uslugi; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX uslugi_dodatkowe_id_uslugi ON public.uslugi_dodatkowe USING btree (id_uslugi);


--
-- Name: uzytkownik_uzytkownik_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX uzytkownik_uzytkownik_id ON public.uzytkownik USING btree (uzytkownik_id);


--
-- Name: zaloga_zaloga_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX zaloga_zaloga_id ON public.zaloga USING btree (zaloga_id);


--
-- Name: znizka_znizka_id; Type: INDEX; Schema: public; Owner: dzang
--

CREATE UNIQUE INDEX znizka_znizka_id ON public.znizka USING btree (znizka_id);


--
-- Name: adres fkadres550606; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.adres
    ADD CONSTRAINT fkadres550606 FOREIGN KEY (osoba_id) REFERENCES public.osoba(osoba_id);


--
-- Name: bagaz_pasazer fkbagaz_pasa196268; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bagaz_pasazer
    ADD CONSTRAINT fkbagaz_pasa196268 FOREIGN KEY (bagazbagaz_id) REFERENCES public.bagaz(bagaz_id);


--
-- Name: bagaz_pasazer fkbagaz_pasa310800; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bagaz_pasazer
    ADD CONSTRAINT fkbagaz_pasa310800 FOREIGN KEY (pasazerpasazer_id) REFERENCES public.pasazer(pasazer_id);


--
-- Name: bilet fkbilet655610; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bilet
    ADD CONSTRAINT fkbilet655610 FOREIGN KEY (lot_id) REFERENCES public.lot(lot_id);


--
-- Name: bilet fkbilet663722; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.bilet
    ADD CONSTRAINT fkbilet663722 FOREIGN KEY (uzytkownik_id) REFERENCES public.uzytkownik(uzytkownik_id);


--
-- Name: cennik fkcennik376628; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.cennik
    ADD CONSTRAINT fkcennik376628 FOREIGN KEY (znizka_id) REFERENCES public.znizka(znizka_id);


--
-- Name: lot fklot425462; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot
    ADD CONSTRAINT fklot425462 FOREIGN KEY (lotnisko_wylotu_id) REFERENCES public.lotnisko(lotnisko_id);


--
-- Name: lot fklot644806; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot
    ADD CONSTRAINT fklot644806 FOREIGN KEY (zaloga_id) REFERENCES public.zaloga(zaloga_id);


--
-- Name: lot fklot754477; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot
    ADD CONSTRAINT fklot754477 FOREIGN KEY (lotnisko_przylotu_id) REFERENCES public.lotnisko(lotnisko_id);


--
-- Name: lot fklot825136; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot
    ADD CONSTRAINT fklot825136 FOREIGN KEY (cennik_id) REFERENCES public.cennik(cennik_id);


--
-- Name: lot_szczegoly fklot_szczeg160793; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot_szczegoly
    ADD CONSTRAINT fklot_szczeg160793 FOREIGN KEY (samolot_id) REFERENCES public.samolot(samolot_id);


--
-- Name: lot_szczegoly fklot_szczeg165841; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.lot_szczegoly
    ADD CONSTRAINT fklot_szczeg165841 FOREIGN KEY (lot_id) REFERENCES public.lot(lot_id);


--
-- Name: pasazer fkpasazer578106; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.pasazer
    ADD CONSTRAINT fkpasazer578106 FOREIGN KEY (siedzenie_id) REFERENCES public.siedzenie(siedzenie_id);


--
-- Name: pasazer_uslugi_dodatkowe fkpasazer_us292883; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe
    ADD CONSTRAINT fkpasazer_us292883 FOREIGN KEY (pasazer_id) REFERENCES public.pasazer(pasazer_id);


--
-- Name: pasazer_uslugi_dodatkowe fkpasazer_us931479; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe
    ADD CONSTRAINT fkpasazer_us931479 FOREIGN KEY (id_uslugi) REFERENCES public.uslugi_dodatkowe(id_uslugi);


--
-- Name: role_uprawnienia fkrole_upraw36933; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.role_uprawnienia
    ADD CONSTRAINT fkrole_upraw36933 FOREIGN KEY (uprawnieniauprawnienia_id) REFERENCES public.uprawnienia(uprawnienia_id);


--
-- Name: role_uprawnienia fkrole_upraw954004; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.role_uprawnienia
    ADD CONSTRAINT fkrole_upraw954004 FOREIGN KEY (rolerola_id) REFERENCES public.role(rola_id);


--
-- Name: siedzenie fksiedzenie959597; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.siedzenie
    ADD CONSTRAINT fksiedzenie959597 FOREIGN KEY (samolot_id) REFERENCES public.samolot(samolot_id);


--
-- Name: uzytkownik_role fkuzytkownik262437; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uzytkownik_role
    ADD CONSTRAINT fkuzytkownik262437 FOREIGN KEY (uzytkownikuzytkownik_id) REFERENCES public.uzytkownik(uzytkownik_id);


--
-- Name: uzytkownik fkuzytkownik798526; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT fkuzytkownik798526 FOREIGN KEY (id_osoba) REFERENCES public.osoba(osoba_id);


--
-- Name: uzytkownik_role fkuzytkownik957722; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.uzytkownik_role
    ADD CONSTRAINT fkuzytkownik957722 FOREIGN KEY (rolerola_id) REFERENCES public.role(rola_id);


--
-- Name: zaloga_uzytkownik fkzaloga_uzy151783; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.zaloga_uzytkownik
    ADD CONSTRAINT fkzaloga_uzy151783 FOREIGN KEY (uzytkownikuzytkownik_id) REFERENCES public.uzytkownik(uzytkownik_id);


--
-- Name: zaloga_uzytkownik fkzaloga_uzy228990; Type: FK CONSTRAINT; Schema: public; Owner: dzang
--

ALTER TABLE ONLY public.zaloga_uzytkownik
    ADD CONSTRAINT fkzaloga_uzy228990 FOREIGN KEY (zalogazaloga_id) REFERENCES public.zaloga(zaloga_id);


--
-- PostgreSQL database dump complete
--

