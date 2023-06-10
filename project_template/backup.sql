PGDMP         0        
        {           maindb    15.3    15.3 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16400    maindb    DATABASE     �   CREATE DATABASE maindb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE maindb;
                dzang    false            �            1259    32825    adres    TABLE     V  CREATE TABLE public.adres (
    osoba_id integer NOT NULL,
    ulica character varying(255) NOT NULL,
    numer_domu character varying(255) NOT NULL,
    numer_mieszkania character varying(255) NOT NULL,
    kod_pocztowy character varying(255) NOT NULL,
    miasto character varying(255) NOT NULL,
    kraj character varying(255) NOT NULL
);
    DROP TABLE public.adres;
       public         heap    dzang    false            �            1259    32885    bagaz    TABLE     �   CREATE TABLE public.bagaz (
    bagaz_id integer NOT NULL,
    typ_bagazu character varying(255) NOT NULL,
    waga character varying(255),
    wymiary character varying(255) NOT NULL,
    cena double precision
);
    DROP TABLE public.bagaz;
       public         heap    dzang    false            �            1259    32884    bagaz_bagaz_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bagaz_bagaz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.bagaz_bagaz_id_seq;
       public          dzang    false    230            �           0    0    bagaz_bagaz_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.bagaz_bagaz_id_seq OWNED BY public.bagaz.bagaz_id;
          public          dzang    false    229            �            1259    57644    bagaz_pasazer    TABLE     �   CREATE TABLE public.bagaz_pasazer (
    bagaz_pasazer_id integer NOT NULL,
    bagazbagaz_id integer NOT NULL,
    pasazerpasazer_id integer NOT NULL
);
 !   DROP TABLE public.bagaz_pasazer;
       public         heap    dzang    false            �            1259    57643 "   bagaz_pasazer_bagaz_pasazer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bagaz_pasazer_bagaz_pasazer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.bagaz_pasazer_bagaz_pasazer_id_seq;
       public          dzang    false    250            �           0    0 "   bagaz_pasazer_bagaz_pasazer_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.bagaz_pasazer_bagaz_pasazer_id_seq OWNED BY public.bagaz_pasazer.bagaz_pasazer_id;
          public          dzang    false    249            �            1259    32862    bilet    TABLE     �   CREATE TABLE public.bilet (
    bilet_id integer NOT NULL,
    uzytkownik_id integer NOT NULL,
    lot_id integer NOT NULL,
    kod character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    cena double precision
);
    DROP TABLE public.bilet;
       public         heap    dzang    false            �           0    0    COLUMN bilet.kod    COMMENT     ]   COMMENT ON COLUMN public.bilet.kod IS 'Krótki kod biletu określający informacje o locie';
          public          dzang    false    224            �            1259    32861    bilet_bilet_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bilet_bilet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.bilet_bilet_id_seq;
       public          dzang    false    224            �           0    0    bilet_bilet_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.bilet_bilet_id_seq OWNED BY public.bilet.bilet_id;
          public          dzang    false    223            �            1259    32906    cennik    TABLE     �   CREATE TABLE public.cennik (
    cennik_id integer NOT NULL,
    klasa character varying(255) NOT NULL,
    cena integer NOT NULL,
    znizka_id integer
);
    DROP TABLE public.cennik;
       public         heap    dzang    false            �            1259    32905    cennik_cennik_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cennik_cennik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.cennik_cennik_id_seq;
       public          dzang    false    235            �           0    0    cennik_cennik_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.cennik_cennik_id_seq OWNED BY public.cennik.cennik_id;
          public          dzang    false    234            �            1259    32871    lot    TABLE     �  CREATE TABLE public.lot (
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
    DROP TABLE public.lot;
       public         heap    dzang    false            �            1259    32870    lot_lot_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lot_lot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.lot_lot_id_seq;
       public          dzang    false    226            �           0    0    lot_lot_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.lot_lot_id_seq OWNED BY public.lot.lot_id;
          public          dzang    false    225            �            1259    32893    lot_szczegoly    TABLE     �   CREATE TABLE public.lot_szczegoly (
    lot_id integer NOT NULL,
    samolot_id integer NOT NULL,
    opoznienie integer,
    kod_bramki character varying(255) NOT NULL,
    liczba_wolnych_miejsc integer NOT NULL
);
 !   DROP TABLE public.lot_szczegoly;
       public         heap    dzang    false            �           0    0    COLUMN lot_szczegoly.opoznienie    COMMENT     Q   COMMENT ON COLUMN public.lot_szczegoly.opoznienie IS 'Opóźnienie w minutach.';
          public          dzang    false    231            �           0    0    COLUMN lot_szczegoly.kod_bramki    COMMENT     Q   COMMENT ON COLUMN public.lot_szczegoly.kod_bramki IS 'Numer bramki na lotnisku';
          public          dzang    false    231            �            1259    32899    lotnisko    TABLE     �   CREATE TABLE public.lotnisko (
    lotnisko_id integer NOT NULL,
    kod_iata character varying(10) NOT NULL,
    nazwa character varying(255) NOT NULL
);
    DROP TABLE public.lotnisko;
       public         heap    dzang    false            �            1259    32898    lotnisko_lotnisko_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lotnisko_lotnisko_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.lotnisko_lotnisko_id_seq;
       public          dzang    false    233            �           0    0    lotnisko_lotnisko_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.lotnisko_lotnisko_id_seq OWNED BY public.lotnisko.lotnisko_id;
          public          dzang    false    232            �            1259    32817    osoba    TABLE     �   CREATE TABLE public.osoba (
    osoba_id integer NOT NULL,
    imie character varying(255) NOT NULL,
    nazwisko character varying(255) NOT NULL,
    pesel character varying(255),
    nr_tel character varying(255),
    wiek character varying(100)
);
    DROP TABLE public.osoba;
       public         heap    dzang    false            �            1259    32816    osoba_osoba_id_seq    SEQUENCE     �   CREATE SEQUENCE public.osoba_osoba_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.osoba_osoba_id_seq;
       public          dzang    false    215            �           0    0    osoba_osoba_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.osoba_osoba_id_seq OWNED BY public.osoba.osoba_id;
          public          dzang    false    214            �            1259    32939    pasazer    TABLE       CREATE TABLE public.pasazer (
    pasazer_id integer NOT NULL,
    bilet_id integer NOT NULL,
    siedzenie_id integer NOT NULL,
    imie character varying(255) NOT NULL,
    nazwisko character varying(255) NOT NULL,
    wiek character varying(255) NOT NULL
);
    DROP TABLE public.pasazer;
       public         heap    dzang    false            �            1259    32938    pasazer_pasazer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pasazer_pasazer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.pasazer_pasazer_id_seq;
       public          dzang    false    244            �           0    0    pasazer_pasazer_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.pasazer_pasazer_id_seq OWNED BY public.pasazer.pasazer_id;
          public          dzang    false    243            �            1259    57662    pasazer_uslugi_dodatkowe    TABLE     �   CREATE TABLE public.pasazer_uslugi_dodatkowe (
    pasazer_uslugi_dodatkowe_id integer NOT NULL,
    pasazer_id integer NOT NULL,
    id_uslugi integer NOT NULL
);
 ,   DROP TABLE public.pasazer_uslugi_dodatkowe;
       public         heap    dzang    false            �            1259    57661 8   pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 O   DROP SEQUENCE public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq;
       public          dzang    false    252            �           0    0 8   pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq OWNED BY public.pasazer_uslugi_dodatkowe.pasazer_uslugi_dodatkowe_id;
          public          dzang    false    251            �            1259    32846    role    TABLE     f   CREATE TABLE public.role (
    rola_id integer NOT NULL,
    nazwa character varying(255) NOT NULL
);
    DROP TABLE public.role;
       public         heap    dzang    false            �            1259    32845    role_rola_id_seq    SEQUENCE     �   CREATE SEQUENCE public.role_rola_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.role_rola_id_seq;
       public          dzang    false    220            �           0    0    role_rola_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.role_rola_id_seq OWNED BY public.role.rola_id;
          public          dzang    false    219            �            1259    32912    role_uprawnienia    TABLE     {   CREATE TABLE public.role_uprawnienia (
    rolerola_id integer NOT NULL,
    uprawnieniauprawnienia_id integer NOT NULL
);
 $   DROP TABLE public.role_uprawnienia;
       public         heap    dzang    false            �            1259    32948    samolot    TABLE     �   CREATE TABLE public.samolot (
    samolot_id integer NOT NULL,
    model character varying(255) NOT NULL,
    linia_lotnicza character varying(255) NOT NULL,
    liczba_miejsc integer NOT NULL
);
    DROP TABLE public.samolot;
       public         heap    dzang    false            �            1259    32947    samolot_samolot_id_seq    SEQUENCE     �   CREATE SEQUENCE public.samolot_samolot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.samolot_samolot_id_seq;
       public          dzang    false    246            �           0    0    samolot_samolot_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.samolot_samolot_id_seq OWNED BY public.samolot.samolot_id;
          public          dzang    false    245            �            1259    32925 	   siedzenie    TABLE     �   CREATE TABLE public.siedzenie (
    siedzenie_id integer NOT NULL,
    samolot_id integer NOT NULL,
    nazwa_siedzenia character varying(255) NOT NULL,
    status character varying(255)
);
    DROP TABLE public.siedzenie;
       public         heap    dzang    false            �            1259    32924    siedzenie_siedzenie_id_seq    SEQUENCE     �   CREATE SEQUENCE public.siedzenie_siedzenie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.siedzenie_siedzenie_id_seq;
       public          dzang    false    240            �           0    0    siedzenie_siedzenie_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.siedzenie_siedzenie_id_seq OWNED BY public.siedzenie.siedzenie_id;
          public          dzang    false    239            �            1259    32853    uprawnienia    TABLE     �   CREATE TABLE public.uprawnienia (
    uprawnienia_id integer NOT NULL,
    kod character varying(255) NOT NULL,
    nazwa character varying(255) NOT NULL,
    opis character varying(255)
);
    DROP TABLE public.uprawnienia;
       public         heap    dzang    false            �            1259    32852    uprawnienia_uprawnienia_id_seq    SEQUENCE     �   CREATE SEQUENCE public.uprawnienia_uprawnienia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.uprawnienia_uprawnienia_id_seq;
       public          dzang    false    222            �           0    0    uprawnienia_uprawnienia_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.uprawnienia_uprawnienia_id_seq OWNED BY public.uprawnienia.uprawnienia_id;
          public          dzang    false    221            �            1259    32878    uslugi_dodatkowe    TABLE     �   CREATE TABLE public.uslugi_dodatkowe (
    id_uslugi integer NOT NULL,
    nazwa character varying(255) NOT NULL,
    cena double precision
);
 $   DROP TABLE public.uslugi_dodatkowe;
       public         heap    dzang    false            �            1259    32877    uslugi_dodatkowe_id_uslugi_seq    SEQUENCE     �   CREATE SEQUENCE public.uslugi_dodatkowe_id_uslugi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.uslugi_dodatkowe_id_uslugi_seq;
       public          dzang    false    228            �           0    0    uslugi_dodatkowe_id_uslugi_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.uslugi_dodatkowe_id_uslugi_seq OWNED BY public.uslugi_dodatkowe.id_uslugi;
          public          dzang    false    227            �            1259    32833 
   uzytkownik    TABLE     �   CREATE TABLE public.uzytkownik (
    uzytkownik_id integer NOT NULL,
    id_osoba integer NOT NULL,
    email character varying(255) NOT NULL,
    haslo character varying(255) NOT NULL,
    salt character varying(255),
    jwt character varying(255)
);
    DROP TABLE public.uzytkownik;
       public         heap    dzang    false            �            1259    32963    uzytkownik_role    TABLE     x   CREATE TABLE public.uzytkownik_role (
    uzytkownikuzytkownik_id integer NOT NULL,
    rolerola_id integer NOT NULL
);
 #   DROP TABLE public.uzytkownik_role;
       public         heap    dzang    false            �            1259    32832    uzytkownik_uzytkownik_id_seq    SEQUENCE     �   CREATE SEQUENCE public.uzytkownik_uzytkownik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.uzytkownik_uzytkownik_id_seq;
       public          dzang    false    218                        0    0    uzytkownik_uzytkownik_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.uzytkownik_uzytkownik_id_seq OWNED BY public.uzytkownik.uzytkownik_id;
          public          dzang    false    217            �            1259    32918    zaloga    TABLE     `   CREATE TABLE public.zaloga (
    zaloga_id integer NOT NULL,
    ilosc_osob integer NOT NULL
);
    DROP TABLE public.zaloga;
       public         heap    dzang    false            �            1259    32968    zaloga_uzytkownik    TABLE     ~   CREATE TABLE public.zaloga_uzytkownik (
    zalogazaloga_id integer NOT NULL,
    uzytkownikuzytkownik_id integer NOT NULL
);
 %   DROP TABLE public.zaloga_uzytkownik;
       public         heap    dzang    false            �            1259    32917    zaloga_zaloga_id_seq    SEQUENCE     �   CREATE SEQUENCE public.zaloga_zaloga_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.zaloga_zaloga_id_seq;
       public          dzang    false    238                       0    0    zaloga_zaloga_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.zaloga_zaloga_id_seq OWNED BY public.zaloga.zaloga_id;
          public          dzang    false    237            �            1259    32932    znizka    TABLE     �   CREATE TABLE public.znizka (
    znizka_id integer NOT NULL,
    wartosc integer NOT NULL,
    nazwa character varying(255) NOT NULL
);
    DROP TABLE public.znizka;
       public         heap    dzang    false            �            1259    32931    znizka_znizka_id_seq    SEQUENCE     �   CREATE SEQUENCE public.znizka_znizka_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.znizka_znizka_id_seq;
       public          dzang    false    242                       0    0    znizka_znizka_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.znizka_znizka_id_seq OWNED BY public.znizka.znizka_id;
          public          dzang    false    241            �           2604    32888    bagaz bagaz_id    DEFAULT     p   ALTER TABLE ONLY public.bagaz ALTER COLUMN bagaz_id SET DEFAULT nextval('public.bagaz_bagaz_id_seq'::regclass);
 =   ALTER TABLE public.bagaz ALTER COLUMN bagaz_id DROP DEFAULT;
       public          dzang    false    230    229    230            �           2604    57647    bagaz_pasazer bagaz_pasazer_id    DEFAULT     �   ALTER TABLE ONLY public.bagaz_pasazer ALTER COLUMN bagaz_pasazer_id SET DEFAULT nextval('public.bagaz_pasazer_bagaz_pasazer_id_seq'::regclass);
 M   ALTER TABLE public.bagaz_pasazer ALTER COLUMN bagaz_pasazer_id DROP DEFAULT;
       public          dzang    false    250    249    250            �           2604    32865    bilet bilet_id    DEFAULT     p   ALTER TABLE ONLY public.bilet ALTER COLUMN bilet_id SET DEFAULT nextval('public.bilet_bilet_id_seq'::regclass);
 =   ALTER TABLE public.bilet ALTER COLUMN bilet_id DROP DEFAULT;
       public          dzang    false    223    224    224            �           2604    32909    cennik cennik_id    DEFAULT     t   ALTER TABLE ONLY public.cennik ALTER COLUMN cennik_id SET DEFAULT nextval('public.cennik_cennik_id_seq'::regclass);
 ?   ALTER TABLE public.cennik ALTER COLUMN cennik_id DROP DEFAULT;
       public          dzang    false    235    234    235            �           2604    32874 
   lot lot_id    DEFAULT     h   ALTER TABLE ONLY public.lot ALTER COLUMN lot_id SET DEFAULT nextval('public.lot_lot_id_seq'::regclass);
 9   ALTER TABLE public.lot ALTER COLUMN lot_id DROP DEFAULT;
       public          dzang    false    225    226    226            �           2604    32902    lotnisko lotnisko_id    DEFAULT     |   ALTER TABLE ONLY public.lotnisko ALTER COLUMN lotnisko_id SET DEFAULT nextval('public.lotnisko_lotnisko_id_seq'::regclass);
 C   ALTER TABLE public.lotnisko ALTER COLUMN lotnisko_id DROP DEFAULT;
       public          dzang    false    233    232    233            �           2604    32820    osoba osoba_id    DEFAULT     p   ALTER TABLE ONLY public.osoba ALTER COLUMN osoba_id SET DEFAULT nextval('public.osoba_osoba_id_seq'::regclass);
 =   ALTER TABLE public.osoba ALTER COLUMN osoba_id DROP DEFAULT;
       public          dzang    false    214    215    215            �           2604    32942    pasazer pasazer_id    DEFAULT     x   ALTER TABLE ONLY public.pasazer ALTER COLUMN pasazer_id SET DEFAULT nextval('public.pasazer_pasazer_id_seq'::regclass);
 A   ALTER TABLE public.pasazer ALTER COLUMN pasazer_id DROP DEFAULT;
       public          dzang    false    244    243    244            �           2604    57665 4   pasazer_uslugi_dodatkowe pasazer_uslugi_dodatkowe_id    DEFAULT     �   ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe ALTER COLUMN pasazer_uslugi_dodatkowe_id SET DEFAULT nextval('public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq'::regclass);
 c   ALTER TABLE public.pasazer_uslugi_dodatkowe ALTER COLUMN pasazer_uslugi_dodatkowe_id DROP DEFAULT;
       public          dzang    false    252    251    252            �           2604    32849    role rola_id    DEFAULT     l   ALTER TABLE ONLY public.role ALTER COLUMN rola_id SET DEFAULT nextval('public.role_rola_id_seq'::regclass);
 ;   ALTER TABLE public.role ALTER COLUMN rola_id DROP DEFAULT;
       public          dzang    false    220    219    220            �           2604    32951    samolot samolot_id    DEFAULT     x   ALTER TABLE ONLY public.samolot ALTER COLUMN samolot_id SET DEFAULT nextval('public.samolot_samolot_id_seq'::regclass);
 A   ALTER TABLE public.samolot ALTER COLUMN samolot_id DROP DEFAULT;
       public          dzang    false    246    245    246            �           2604    32928    siedzenie siedzenie_id    DEFAULT     �   ALTER TABLE ONLY public.siedzenie ALTER COLUMN siedzenie_id SET DEFAULT nextval('public.siedzenie_siedzenie_id_seq'::regclass);
 E   ALTER TABLE public.siedzenie ALTER COLUMN siedzenie_id DROP DEFAULT;
       public          dzang    false    240    239    240            �           2604    32856    uprawnienia uprawnienia_id    DEFAULT     �   ALTER TABLE ONLY public.uprawnienia ALTER COLUMN uprawnienia_id SET DEFAULT nextval('public.uprawnienia_uprawnienia_id_seq'::regclass);
 I   ALTER TABLE public.uprawnienia ALTER COLUMN uprawnienia_id DROP DEFAULT;
       public          dzang    false    221    222    222            �           2604    32881    uslugi_dodatkowe id_uslugi    DEFAULT     �   ALTER TABLE ONLY public.uslugi_dodatkowe ALTER COLUMN id_uslugi SET DEFAULT nextval('public.uslugi_dodatkowe_id_uslugi_seq'::regclass);
 I   ALTER TABLE public.uslugi_dodatkowe ALTER COLUMN id_uslugi DROP DEFAULT;
       public          dzang    false    227    228    228            �           2604    32836    uzytkownik uzytkownik_id    DEFAULT     �   ALTER TABLE ONLY public.uzytkownik ALTER COLUMN uzytkownik_id SET DEFAULT nextval('public.uzytkownik_uzytkownik_id_seq'::regclass);
 G   ALTER TABLE public.uzytkownik ALTER COLUMN uzytkownik_id DROP DEFAULT;
       public          dzang    false    217    218    218            �           2604    32921    zaloga zaloga_id    DEFAULT     t   ALTER TABLE ONLY public.zaloga ALTER COLUMN zaloga_id SET DEFAULT nextval('public.zaloga_zaloga_id_seq'::regclass);
 ?   ALTER TABLE public.zaloga ALTER COLUMN zaloga_id DROP DEFAULT;
       public          dzang    false    237    238    238            �           2604    32935    znizka znizka_id    DEFAULT     t   ALTER TABLE ONLY public.znizka ALTER COLUMN znizka_id SET DEFAULT nextval('public.znizka_znizka_id_seq'::regclass);
 ?   ALTER TABLE public.znizka ALTER COLUMN znizka_id DROP DEFAULT;
       public          dzang    false    242    241    242            �          0    32825    adres 
   TABLE DATA           j   COPY public.adres (osoba_id, ulica, numer_domu, numer_mieszkania, kod_pocztowy, miasto, kraj) FROM stdin;
    public          dzang    false    216   ��       �          0    32885    bagaz 
   TABLE DATA           J   COPY public.bagaz (bagaz_id, typ_bagazu, waga, wymiary, cena) FROM stdin;
    public          dzang    false    230   g�       �          0    57644    bagaz_pasazer 
   TABLE DATA           [   COPY public.bagaz_pasazer (bagaz_pasazer_id, bagazbagaz_id, pasazerpasazer_id) FROM stdin;
    public          dzang    false    250   ��       �          0    32862    bilet 
   TABLE DATA           S   COPY public.bilet (bilet_id, uzytkownik_id, lot_id, kod, status, cena) FROM stdin;
    public          dzang    false    224   �       �          0    32906    cennik 
   TABLE DATA           C   COPY public.cennik (cennik_id, klasa, cena, znizka_id) FROM stdin;
    public          dzang    false    235   ��       �          0    32871    lot 
   TABLE DATA           �   COPY public.lot (lot_id, cennik_id, zaloga_id, lotnisko_wylotu_id, lotnisko_przylotu_id, status, data_wylotu, data_przylotu, kod_lotu) FROM stdin;
    public          dzang    false    226   ��       �          0    32893    lot_szczegoly 
   TABLE DATA           j   COPY public.lot_szczegoly (lot_id, samolot_id, opoznienie, kod_bramki, liczba_wolnych_miejsc) FROM stdin;
    public          dzang    false    231   ��       �          0    32899    lotnisko 
   TABLE DATA           @   COPY public.lotnisko (lotnisko_id, kod_iata, nazwa) FROM stdin;
    public          dzang    false    233   �       �          0    32817    osoba 
   TABLE DATA           N   COPY public.osoba (osoba_id, imie, nazwisko, pesel, nr_tel, wiek) FROM stdin;
    public          dzang    false    215   ��       �          0    32939    pasazer 
   TABLE DATA           [   COPY public.pasazer (pasazer_id, bilet_id, siedzenie_id, imie, nazwisko, wiek) FROM stdin;
    public          dzang    false    244   t�       �          0    57662    pasazer_uslugi_dodatkowe 
   TABLE DATA           f   COPY public.pasazer_uslugi_dodatkowe (pasazer_uslugi_dodatkowe_id, pasazer_id, id_uslugi) FROM stdin;
    public          dzang    false    252   #�       �          0    32846    role 
   TABLE DATA           .   COPY public.role (rola_id, nazwa) FROM stdin;
    public          dzang    false    220   @�       �          0    32912    role_uprawnienia 
   TABLE DATA           R   COPY public.role_uprawnienia (rolerola_id, uprawnieniauprawnienia_id) FROM stdin;
    public          dzang    false    236   ��       �          0    32948    samolot 
   TABLE DATA           S   COPY public.samolot (samolot_id, model, linia_lotnicza, liczba_miejsc) FROM stdin;
    public          dzang    false    246   ��       �          0    32925 	   siedzenie 
   TABLE DATA           V   COPY public.siedzenie (siedzenie_id, samolot_id, nazwa_siedzenia, status) FROM stdin;
    public          dzang    false    240   o�       �          0    32853    uprawnienia 
   TABLE DATA           G   COPY public.uprawnienia (uprawnienia_id, kod, nazwa, opis) FROM stdin;
    public          dzang    false    222   0�       �          0    32878    uslugi_dodatkowe 
   TABLE DATA           B   COPY public.uslugi_dodatkowe (id_uslugi, nazwa, cena) FROM stdin;
    public          dzang    false    228   0�       �          0    32833 
   uzytkownik 
   TABLE DATA           V   COPY public.uzytkownik (uzytkownik_id, id_osoba, email, haslo, salt, jwt) FROM stdin;
    public          dzang    false    218   ��       �          0    32963    uzytkownik_role 
   TABLE DATA           O   COPY public.uzytkownik_role (uzytkownikuzytkownik_id, rolerola_id) FROM stdin;
    public          dzang    false    247   t�       �          0    32918    zaloga 
   TABLE DATA           7   COPY public.zaloga (zaloga_id, ilosc_osob) FROM stdin;
    public          dzang    false    238   ��       �          0    32968    zaloga_uzytkownik 
   TABLE DATA           U   COPY public.zaloga_uzytkownik (zalogazaloga_id, uzytkownikuzytkownik_id) FROM stdin;
    public          dzang    false    248   ��       �          0    32932    znizka 
   TABLE DATA           ;   COPY public.znizka (znizka_id, wartosc, nazwa) FROM stdin;
    public          dzang    false    242   �                  0    0    bagaz_bagaz_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.bagaz_bagaz_id_seq', 1, false);
          public          dzang    false    229                       0    0 "   bagaz_pasazer_bagaz_pasazer_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.bagaz_pasazer_bagaz_pasazer_id_seq', 23, true);
          public          dzang    false    249                       0    0    bilet_bilet_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.bilet_bilet_id_seq', 46, true);
          public          dzang    false    223                       0    0    cennik_cennik_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.cennik_cennik_id_seq', 4, true);
          public          dzang    false    234                       0    0    lot_lot_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.lot_lot_id_seq', 20, true);
          public          dzang    false    225                       0    0    lotnisko_lotnisko_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.lotnisko_lotnisko_id_seq', 10, true);
          public          dzang    false    232            	           0    0    osoba_osoba_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.osoba_osoba_id_seq', 25, true);
          public          dzang    false    214            
           0    0    pasazer_pasazer_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.pasazer_pasazer_id_seq', 52, true);
          public          dzang    false    243                       0    0 8   pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq    SEQUENCE SET     f   SELECT pg_catalog.setval('public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id_seq', 4, true);
          public          dzang    false    251                       0    0    role_rola_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.role_rola_id_seq', 5, true);
          public          dzang    false    219                       0    0    samolot_samolot_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.samolot_samolot_id_seq', 13, true);
          public          dzang    false    245                       0    0    siedzenie_siedzenie_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.siedzenie_siedzenie_id_seq', 139, true);
          public          dzang    false    239                       0    0    uprawnienia_uprawnienia_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.uprawnienia_uprawnienia_id_seq', 5, true);
          public          dzang    false    221                       0    0    uslugi_dodatkowe_id_uslugi_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.uslugi_dodatkowe_id_uslugi_seq', 1, false);
          public          dzang    false    227                       0    0    uzytkownik_uzytkownik_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.uzytkownik_uzytkownik_id_seq', 21, true);
          public          dzang    false    217                       0    0    zaloga_zaloga_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.zaloga_zaloga_id_seq', 5, true);
          public          dzang    false    237                       0    0    znizka_znizka_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.znizka_znizka_id_seq', 1, false);
          public          dzang    false    241            �           2606    32831    adres adres_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.adres
    ADD CONSTRAINT adres_pkey PRIMARY KEY (osoba_id);
 :   ALTER TABLE ONLY public.adres DROP CONSTRAINT adres_pkey;
       public            dzang    false    216                       2606    57649     bagaz_pasazer bagaz_pasazer_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.bagaz_pasazer
    ADD CONSTRAINT bagaz_pasazer_pkey PRIMARY KEY (bagaz_pasazer_id);
 J   ALTER TABLE ONLY public.bagaz_pasazer DROP CONSTRAINT bagaz_pasazer_pkey;
       public            dzang    false    250            �           2606    32892    bagaz bagaz_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bagaz
    ADD CONSTRAINT bagaz_pkey PRIMARY KEY (bagaz_id);
 :   ALTER TABLE ONLY public.bagaz DROP CONSTRAINT bagaz_pkey;
       public            dzang    false    230            �           2606    32869    bilet bilet_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bilet
    ADD CONSTRAINT bilet_pkey PRIMARY KEY (bilet_id);
 :   ALTER TABLE ONLY public.bilet DROP CONSTRAINT bilet_pkey;
       public            dzang    false    224                       2606    32911    cennik cennik_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.cennik
    ADD CONSTRAINT cennik_pkey PRIMARY KEY (cennik_id);
 <   ALTER TABLE ONLY public.cennik DROP CONSTRAINT cennik_pkey;
       public            dzang    false    235            �           2606    32824    osoba id_klienta 
   CONSTRAINT     T   ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT id_klienta PRIMARY KEY (osoba_id);
 :   ALTER TABLE ONLY public.osoba DROP CONSTRAINT id_klienta;
       public            dzang    false    215            �           2606    32876    lot lot_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.lot
    ADD CONSTRAINT lot_pkey PRIMARY KEY (lot_id);
 6   ALTER TABLE ONLY public.lot DROP CONSTRAINT lot_pkey;
       public            dzang    false    226            �           2606    32897     lot_szczegoly lot_szczegoly_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.lot_szczegoly
    ADD CONSTRAINT lot_szczegoly_pkey PRIMARY KEY (lot_id);
 J   ALTER TABLE ONLY public.lot_szczegoly DROP CONSTRAINT lot_szczegoly_pkey;
       public            dzang    false    231            �           2606    32904    lotnisko lotnisko_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.lotnisko
    ADD CONSTRAINT lotnisko_pkey PRIMARY KEY (lotnisko_id);
 @   ALTER TABLE ONLY public.lotnisko DROP CONSTRAINT lotnisko_pkey;
       public            dzang    false    233                       2606    32946    pasazer pasazer_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.pasazer
    ADD CONSTRAINT pasazer_pkey PRIMARY KEY (pasazer_id);
 >   ALTER TABLE ONLY public.pasazer DROP CONSTRAINT pasazer_pkey;
       public            dzang    false    244                       2606    57667 6   pasazer_uslugi_dodatkowe pasazer_uslugi_dodatkowe_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe
    ADD CONSTRAINT pasazer_uslugi_dodatkowe_pkey PRIMARY KEY (pasazer_uslugi_dodatkowe_id);
 `   ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe DROP CONSTRAINT pasazer_uslugi_dodatkowe_pkey;
       public            dzang    false    252            �           2606    32851    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (rola_id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            dzang    false    220                       2606    32916 &   role_uprawnienia role_uprawnienia_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.role_uprawnienia
    ADD CONSTRAINT role_uprawnienia_pkey PRIMARY KEY (rolerola_id, uprawnieniauprawnienia_id);
 P   ALTER TABLE ONLY public.role_uprawnienia DROP CONSTRAINT role_uprawnienia_pkey;
       public            dzang    false    236    236                       2606    32955    samolot samolot_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.samolot
    ADD CONSTRAINT samolot_pkey PRIMARY KEY (samolot_id);
 >   ALTER TABLE ONLY public.samolot DROP CONSTRAINT samolot_pkey;
       public            dzang    false    246                       2606    32930    siedzenie siedzenie_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.siedzenie
    ADD CONSTRAINT siedzenie_pkey PRIMARY KEY (siedzenie_id);
 B   ALTER TABLE ONLY public.siedzenie DROP CONSTRAINT siedzenie_pkey;
       public            dzang    false    240            �           2606    32860    uprawnienia uprawnienia_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.uprawnienia
    ADD CONSTRAINT uprawnienia_pkey PRIMARY KEY (uprawnienia_id);
 F   ALTER TABLE ONLY public.uprawnienia DROP CONSTRAINT uprawnienia_pkey;
       public            dzang    false    222            �           2606    32883 &   uslugi_dodatkowe uslugi_dodatkowe_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.uslugi_dodatkowe
    ADD CONSTRAINT uslugi_dodatkowe_pkey PRIMARY KEY (id_uslugi);
 P   ALTER TABLE ONLY public.uslugi_dodatkowe DROP CONSTRAINT uslugi_dodatkowe_pkey;
       public            dzang    false    228            �           2606    32844    uzytkownik uzytkownik_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.uzytkownik DROP CONSTRAINT uzytkownik_email_key;
       public            dzang    false    218            �           2606    32842 "   uzytkownik uzytkownik_id_osoba_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_id_osoba_key UNIQUE (id_osoba);
 L   ALTER TABLE ONLY public.uzytkownik DROP CONSTRAINT uzytkownik_id_osoba_key;
       public            dzang    false    218            �           2606    32840    uzytkownik uzytkownik_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_pkey PRIMARY KEY (uzytkownik_id);
 D   ALTER TABLE ONLY public.uzytkownik DROP CONSTRAINT uzytkownik_pkey;
       public            dzang    false    218                       2606    32967 $   uzytkownik_role uzytkownik_role_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.uzytkownik_role
    ADD CONSTRAINT uzytkownik_role_pkey PRIMARY KEY (uzytkownikuzytkownik_id, rolerola_id);
 N   ALTER TABLE ONLY public.uzytkownik_role DROP CONSTRAINT uzytkownik_role_pkey;
       public            dzang    false    247    247                       2606    32923    zaloga zaloga_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.zaloga
    ADD CONSTRAINT zaloga_pkey PRIMARY KEY (zaloga_id);
 <   ALTER TABLE ONLY public.zaloga DROP CONSTRAINT zaloga_pkey;
       public            dzang    false    238                       2606    32972 (   zaloga_uzytkownik zaloga_uzytkownik_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.zaloga_uzytkownik
    ADD CONSTRAINT zaloga_uzytkownik_pkey PRIMARY KEY (zalogazaloga_id, uzytkownikuzytkownik_id);
 R   ALTER TABLE ONLY public.zaloga_uzytkownik DROP CONSTRAINT zaloga_uzytkownik_pkey;
       public            dzang    false    248    248                       2606    32937    znizka znizka_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.znizka
    ADD CONSTRAINT znizka_pkey PRIMARY KEY (znizka_id);
 <   ALTER TABLE ONLY public.znizka DROP CONSTRAINT znizka_pkey;
       public            dzang    false    242            �           1259    32979    adres_osoba_id    INDEX     K   CREATE UNIQUE INDEX adres_osoba_id ON public.adres USING btree (osoba_id);
 "   DROP INDEX public.adres_osoba_id;
       public            dzang    false    216            �           1259    32986    bagaz_bagaz_id    INDEX     K   CREATE UNIQUE INDEX bagaz_bagaz_id ON public.bagaz USING btree (bagaz_id);
 "   DROP INDEX public.bagaz_bagaz_id;
       public            dzang    false    230                       1259    57650    bagaz_pasazer_bagaz_pasazer_id    INDEX     k   CREATE UNIQUE INDEX bagaz_pasazer_bagaz_pasazer_id ON public.bagaz_pasazer USING btree (bagaz_pasazer_id);
 2   DROP INDEX public.bagaz_pasazer_bagaz_pasazer_id;
       public            dzang    false    250            �           1259    32983    bilet_bilet_id    INDEX     K   CREATE UNIQUE INDEX bilet_bilet_id ON public.bilet USING btree (bilet_id);
 "   DROP INDEX public.bilet_bilet_id;
       public            dzang    false    224            �           1259    32989    cennik_cennik_id    INDEX     O   CREATE UNIQUE INDEX cennik_cennik_id ON public.cennik USING btree (cennik_id);
 $   DROP INDEX public.cennik_cennik_id;
       public            dzang    false    235            �           1259    32984 
   lot_lot_id    INDEX     C   CREATE UNIQUE INDEX lot_lot_id ON public.lot USING btree (lot_id);
    DROP INDEX public.lot_lot_id;
       public            dzang    false    226            �           1259    32987    lot_szczegoly_lot_id    INDEX     W   CREATE UNIQUE INDEX lot_szczegoly_lot_id ON public.lot_szczegoly USING btree (lot_id);
 (   DROP INDEX public.lot_szczegoly_lot_id;
       public            dzang    false    231            �           1259    32988    lotnisko_lotnisko_id    INDEX     W   CREATE UNIQUE INDEX lotnisko_lotnisko_id ON public.lotnisko USING btree (lotnisko_id);
 (   DROP INDEX public.lotnisko_lotnisko_id;
       public            dzang    false    233            �           1259    32978    osoba_osoba_id    INDEX     K   CREATE UNIQUE INDEX osoba_osoba_id ON public.osoba USING btree (osoba_id);
 "   DROP INDEX public.osoba_osoba_id;
       public            dzang    false    215                       1259    32993    pasazer_pasazer_id    INDEX     S   CREATE UNIQUE INDEX pasazer_pasazer_id ON public.pasazer USING btree (pasazer_id);
 &   DROP INDEX public.pasazer_pasazer_id;
       public            dzang    false    244                       1259    57668 4   pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id    INDEX     �   CREATE UNIQUE INDEX pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id ON public.pasazer_uslugi_dodatkowe USING btree (pasazer_uslugi_dodatkowe_id);
 H   DROP INDEX public.pasazer_uslugi_dodatkowe_pasazer_uslugi_dodatkowe_id;
       public            dzang    false    252            �           1259    32981    role_rola_id    INDEX     G   CREATE UNIQUE INDEX role_rola_id ON public.role USING btree (rola_id);
     DROP INDEX public.role_rola_id;
       public            dzang    false    220                       1259    32994    samolot_samolot_id    INDEX     S   CREATE UNIQUE INDEX samolot_samolot_id ON public.samolot USING btree (samolot_id);
 &   DROP INDEX public.samolot_samolot_id;
       public            dzang    false    246            	           1259    32991    siedzenie_siedzenie_id    INDEX     [   CREATE UNIQUE INDEX siedzenie_siedzenie_id ON public.siedzenie USING btree (siedzenie_id);
 *   DROP INDEX public.siedzenie_siedzenie_id;
       public            dzang    false    240            �           1259    32982    uprawnienia_uprawnienia_id    INDEX     c   CREATE UNIQUE INDEX uprawnienia_uprawnienia_id ON public.uprawnienia USING btree (uprawnienia_id);
 .   DROP INDEX public.uprawnienia_uprawnienia_id;
       public            dzang    false    222            �           1259    32985    uslugi_dodatkowe_id_uslugi    INDEX     c   CREATE UNIQUE INDEX uslugi_dodatkowe_id_uslugi ON public.uslugi_dodatkowe USING btree (id_uslugi);
 .   DROP INDEX public.uslugi_dodatkowe_id_uslugi;
       public            dzang    false    228            �           1259    32980    uzytkownik_uzytkownik_id    INDEX     _   CREATE UNIQUE INDEX uzytkownik_uzytkownik_id ON public.uzytkownik USING btree (uzytkownik_id);
 ,   DROP INDEX public.uzytkownik_uzytkownik_id;
       public            dzang    false    218                       1259    32990    zaloga_zaloga_id    INDEX     O   CREATE UNIQUE INDEX zaloga_zaloga_id ON public.zaloga USING btree (zaloga_id);
 $   DROP INDEX public.zaloga_zaloga_id;
       public            dzang    false    238                       1259    32992    znizka_znizka_id    INDEX     O   CREATE UNIQUE INDEX znizka_znizka_id ON public.znizka USING btree (znizka_id);
 $   DROP INDEX public.znizka_znizka_id;
       public            dzang    false    242                       2606    49290    adres fkadres550606    FK CONSTRAINT     y   ALTER TABLE ONLY public.adres
    ADD CONSTRAINT fkadres550606 FOREIGN KEY (osoba_id) REFERENCES public.osoba(osoba_id);
 =   ALTER TABLE ONLY public.adres DROP CONSTRAINT fkadres550606;
       public          dzang    false    3291    216    215            0           2606    57651     bagaz_pasazer fkbagaz_pasa196268    FK CONSTRAINT     �   ALTER TABLE ONLY public.bagaz_pasazer
    ADD CONSTRAINT fkbagaz_pasa196268 FOREIGN KEY (bagazbagaz_id) REFERENCES public.bagaz(bagaz_id);
 J   ALTER TABLE ONLY public.bagaz_pasazer DROP CONSTRAINT fkbagaz_pasa196268;
       public          dzang    false    3320    250    230            1           2606    57656     bagaz_pasazer fkbagaz_pasa310800    FK CONSTRAINT     �   ALTER TABLE ONLY public.bagaz_pasazer
    ADD CONSTRAINT fkbagaz_pasa310800 FOREIGN KEY (pasazerpasazer_id) REFERENCES public.pasazer(pasazer_id);
 J   ALTER TABLE ONLY public.bagaz_pasazer DROP CONSTRAINT fkbagaz_pasa310800;
       public          dzang    false    3343    250    244                       2606    49250    bilet fkbilet655610    FK CONSTRAINT     s   ALTER TABLE ONLY public.bilet
    ADD CONSTRAINT fkbilet655610 FOREIGN KEY (lot_id) REFERENCES public.lot(lot_id);
 =   ALTER TABLE ONLY public.bilet DROP CONSTRAINT fkbilet655610;
       public          dzang    false    226    224    3314                        2606    49265    bilet fkbilet663722    FK CONSTRAINT     �   ALTER TABLE ONLY public.bilet
    ADD CONSTRAINT fkbilet663722 FOREIGN KEY (uzytkownik_id) REFERENCES public.uzytkownik(uzytkownik_id);
 =   ALTER TABLE ONLY public.bilet DROP CONSTRAINT fkbilet663722;
       public          dzang    false    3301    224    218            '           2606    49255    cennik fkcennik376628    FK CONSTRAINT     ~   ALTER TABLE ONLY public.cennik
    ADD CONSTRAINT fkcennik376628 FOREIGN KEY (znizka_id) REFERENCES public.znizka(znizka_id);
 ?   ALTER TABLE ONLY public.cennik DROP CONSTRAINT fkcennik376628;
       public          dzang    false    3339    242    235            !           2606    49340    lot fklot425462    FK CONSTRAINT     �   ALTER TABLE ONLY public.lot
    ADD CONSTRAINT fklot425462 FOREIGN KEY (lotnisko_wylotu_id) REFERENCES public.lotnisko(lotnisko_id);
 9   ALTER TABLE ONLY public.lot DROP CONSTRAINT fklot425462;
       public          dzang    false    3326    226    233            "           2606    49260    lot fklot644806    FK CONSTRAINT     x   ALTER TABLE ONLY public.lot
    ADD CONSTRAINT fklot644806 FOREIGN KEY (zaloga_id) REFERENCES public.zaloga(zaloga_id);
 9   ALTER TABLE ONLY public.lot DROP CONSTRAINT fklot644806;
       public          dzang    false    226    3333    238            #           2606    49345    lot fklot754477    FK CONSTRAINT     �   ALTER TABLE ONLY public.lot
    ADD CONSTRAINT fklot754477 FOREIGN KEY (lotnisko_przylotu_id) REFERENCES public.lotnisko(lotnisko_id);
 9   ALTER TABLE ONLY public.lot DROP CONSTRAINT fklot754477;
       public          dzang    false    3326    233    226            $           2606    49225    lot fklot825136    FK CONSTRAINT     x   ALTER TABLE ONLY public.lot
    ADD CONSTRAINT fklot825136 FOREIGN KEY (cennik_id) REFERENCES public.cennik(cennik_id);
 9   ALTER TABLE ONLY public.lot DROP CONSTRAINT fklot825136;
       public          dzang    false    235    3329    226            %           2606    49270     lot_szczegoly fklot_szczeg160793    FK CONSTRAINT     �   ALTER TABLE ONLY public.lot_szczegoly
    ADD CONSTRAINT fklot_szczeg160793 FOREIGN KEY (samolot_id) REFERENCES public.samolot(samolot_id);
 J   ALTER TABLE ONLY public.lot_szczegoly DROP CONSTRAINT fklot_szczeg160793;
       public          dzang    false    3345    246    231            &           2606    49245     lot_szczegoly fklot_szczeg165841    FK CONSTRAINT     �   ALTER TABLE ONLY public.lot_szczegoly
    ADD CONSTRAINT fklot_szczeg165841 FOREIGN KEY (lot_id) REFERENCES public.lot(lot_id);
 J   ALTER TABLE ONLY public.lot_szczegoly DROP CONSTRAINT fklot_szczeg165841;
       public          dzang    false    226    3314    231            +           2606    49285    pasazer fkpasazer578106    FK CONSTRAINT     �   ALTER TABLE ONLY public.pasazer
    ADD CONSTRAINT fkpasazer578106 FOREIGN KEY (siedzenie_id) REFERENCES public.siedzenie(siedzenie_id);
 A   ALTER TABLE ONLY public.pasazer DROP CONSTRAINT fkpasazer578106;
       public          dzang    false    3336    240    244            2           2606    57669 +   pasazer_uslugi_dodatkowe fkpasazer_us292883    FK CONSTRAINT     �   ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe
    ADD CONSTRAINT fkpasazer_us292883 FOREIGN KEY (pasazer_id) REFERENCES public.pasazer(pasazer_id);
 U   ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe DROP CONSTRAINT fkpasazer_us292883;
       public          dzang    false    252    244    3343            3           2606    57674 +   pasazer_uslugi_dodatkowe fkpasazer_us931479    FK CONSTRAINT     �   ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe
    ADD CONSTRAINT fkpasazer_us931479 FOREIGN KEY (id_uslugi) REFERENCES public.uslugi_dodatkowe(id_uslugi);
 U   ALTER TABLE ONLY public.pasazer_uslugi_dodatkowe DROP CONSTRAINT fkpasazer_us931479;
       public          dzang    false    3317    228    252            (           2606    49240 "   role_uprawnienia fkrole_upraw36933    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_uprawnienia
    ADD CONSTRAINT fkrole_upraw36933 FOREIGN KEY (uprawnieniauprawnienia_id) REFERENCES public.uprawnienia(uprawnienia_id);
 L   ALTER TABLE ONLY public.role_uprawnienia DROP CONSTRAINT fkrole_upraw36933;
       public          dzang    false    236    3307    222            )           2606    49235 #   role_uprawnienia fkrole_upraw954004    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_uprawnienia
    ADD CONSTRAINT fkrole_upraw954004 FOREIGN KEY (rolerola_id) REFERENCES public.role(rola_id);
 M   ALTER TABLE ONLY public.role_uprawnienia DROP CONSTRAINT fkrole_upraw954004;
       public          dzang    false    3304    236    220            *           2606    49275    siedzenie fksiedzenie959597    FK CONSTRAINT     �   ALTER TABLE ONLY public.siedzenie
    ADD CONSTRAINT fksiedzenie959597 FOREIGN KEY (samolot_id) REFERENCES public.samolot(samolot_id);
 E   ALTER TABLE ONLY public.siedzenie DROP CONSTRAINT fksiedzenie959597;
       public          dzang    false    3345    240    246            ,           2606    49305 "   uzytkownik_role fkuzytkownik262437    FK CONSTRAINT     �   ALTER TABLE ONLY public.uzytkownik_role
    ADD CONSTRAINT fkuzytkownik262437 FOREIGN KEY (uzytkownikuzytkownik_id) REFERENCES public.uzytkownik(uzytkownik_id);
 L   ALTER TABLE ONLY public.uzytkownik_role DROP CONSTRAINT fkuzytkownik262437;
       public          dzang    false    247    3301    218                       2606    49220    uzytkownik fkuzytkownik798526    FK CONSTRAINT     �   ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT fkuzytkownik798526 FOREIGN KEY (id_osoba) REFERENCES public.osoba(osoba_id);
 G   ALTER TABLE ONLY public.uzytkownik DROP CONSTRAINT fkuzytkownik798526;
       public          dzang    false    3291    218    215            -           2606    49310 "   uzytkownik_role fkuzytkownik957722    FK CONSTRAINT     �   ALTER TABLE ONLY public.uzytkownik_role
    ADD CONSTRAINT fkuzytkownik957722 FOREIGN KEY (rolerola_id) REFERENCES public.role(rola_id);
 L   ALTER TABLE ONLY public.uzytkownik_role DROP CONSTRAINT fkuzytkownik957722;
       public          dzang    false    220    3304    247            .           2606    49320 $   zaloga_uzytkownik fkzaloga_uzy151783    FK CONSTRAINT     �   ALTER TABLE ONLY public.zaloga_uzytkownik
    ADD CONSTRAINT fkzaloga_uzy151783 FOREIGN KEY (uzytkownikuzytkownik_id) REFERENCES public.uzytkownik(uzytkownik_id);
 N   ALTER TABLE ONLY public.zaloga_uzytkownik DROP CONSTRAINT fkzaloga_uzy151783;
       public          dzang    false    3301    248    218            /           2606    49315 $   zaloga_uzytkownik fkzaloga_uzy228990    FK CONSTRAINT     �   ALTER TABLE ONLY public.zaloga_uzytkownik
    ADD CONSTRAINT fkzaloga_uzy228990 FOREIGN KEY (zalogazaloga_id) REFERENCES public.zaloga(zaloga_id);
 N   ALTER TABLE ONLY public.zaloga_uzytkownik DROP CONSTRAINT fkzaloga_uzy228990;
       public          dzang    false    238    248    3333            �   �   x�5���0���.���?\�����H��N�ԂJe��Fe�U�kI� [��;Kܧ8��<DHR��,\iS�c_�߹d�g��5VR�e���VĆ*����t>@
X�}-n�Fڎ�_�k)!/j�~3٬�� �:��e�Y4�ua��.�@B      �   h   x�3�tJLO<�G� ?����䪼JNC��tN�
c�
#��\N.#���Ԭ�⒢��D�JC�
CC 67)640�2ƪ��rcS.�ʍ�)725������ ��8      �   '   x�32�4�4��22Ҧ\FF ڐ��Dq��qqq b�
      �   k   x�3�4BG'gC#cN����JN.#Ntqu315C6�AwOsKNǼҜ��D��	'zy�!�7�A_?cST�f�F��F�@kM8�,�b���� R#-      �   R   x�3�t������L��K�420����2�(J��,��4�s:eV��'rZ@�L82S�ʋ��s�9M!1z\\\ F��      �   �   x�u��
�0�继�*��m7��%�C��E�����*��IE�5r��A>��8��ttCg�/�Ĳ S�����2�JQ"CT����~)k,U%��:v�<�*t�"a�cP�{�_�0�ҫ
Qռ8Z��F�2$���y���:8󓄵3!Ӓ!AP��C��$�򳏆��E��X      �   I   x����0�j�0�}%Z&��s���d�`~܁�)ɲ'q35�����	�-��絶�Z�+�347I?�V�      �   m   x�̱
�0��ޏ�V��1 fx���Q+����@�^q=é\@м�Z�G�M Yc*l � �-�e��b��nj<�_:���y�s׬_�������{����_[��      �   �   x�u�K��0�׿Sl��c�m�0�n�q0�4	$Js�a.6r3����>,��������S��XW�U�t�a1�}�q�E�uU��&���w�����$��;Sd�����\x�y}]B��Z��T`*r8�ac�p�	�� ]��L Q���6���wi1�RT�Q�G��HC�<�y�yd��f[��1�
3������sZ���Q�!�_D��      �   �   x�-�A�0����[Z��[Qc��	�X%�$��yýly��3�/ �;�����&�h��b�)At2��7n��42#�����i����jo�$��bھ�u�?�E�r�Bjp��G?�*�])| H�e����\�l=�o���92�      �      x������ � �      �   C   x�3�tL����,.)J,�/�2�(JL�/����2����L�+�2���OI�(0�t�?:�H;W� ���      �   !   x�3�4�2�4�2�4�2�4�2�4����� '�      �   �   x�uα
�0����)�-�hL܄B���[34�D)�}C;�����i��s�O�j��X�����.�i˪��u��!����)�Ԡ[����G�;�SXC^Ti|x�`,��=�FH���2��t�8y�_�.�$��hE�bD�$���O�U�      �   �   x�M�;!��&Zc�O	$mN�m�()s���F[>��`b*L����
��F�P�&��qO�LB�lX��3��3��3��3��!��|=��,*/ᤚ-����f�.��Y��٢[�l��F��gǪh��; � Y�<�h��:2"�=K�=Â:�
{��
���Q,��y!��`(      �   �   x���ˊ�0���S�	
���x���iGAB�h۔�%${b�í;�{�F�tw������E�l>�C@��a9g���t�*���Q��(���*�S����3R=�\(o�X��Բbg�9�&!�D�;���Z��#	�[���ծ^��;��`�E�V�c��=C̽P�ၓ�L`���~��t���{��:Cg
S����?������a�Hiƻh��F��6�}$�%���_T�      �   �   x�ɱ�0@��n
O�� �E@GCsIN�	�#sȲK$�`Z:�^���zn �\����T��
N��XV�����j���'�wR)X���0Zc]�:�E󫷤R���0����ֲR ͖J�N�жx� �I�/�      �   �  x���[o�0������Ql 	w͉ژ��Re	�p��#[�imM�|e?��W�> �I�%yM�2�aC�19?g "e�C$�ܟ�,#\���_䑔e��(�a��q%�U�\������X~�E ��T�����:�}�|a���$p�yU\�P�Cs��j$�G�	�(�s���#4���!��wg�*d�c�~�m>I�F���⠾�7����GՌX<�c�\���0[-�>թ��:b��jfH�L��qo�4���s��w����y�6�O���S�]$W*�)q^����������LK�Մ���s�׭��]$sf��|b^'�YY�C���HƝ>[N���*�o{62��  x�g'���!3���dS���\�됲�mI���~��w�m��� �]8�����?;�>�[Ӂ�g�`�:�8�)
�������.Si��o�4%m��j���+�I˟�v�kw��R�^<��ul�ܫ`�'�b��=N�Q���N�R�b*~��貵t�\x2@ 	�٫�U�(eM:���يn���ef�7���B�⌽�6J�/���*�-��_�J�:�oS�J;���A��F���[��_���w��{+�X���m33��QWV^�	�^��:s����v�obWW$�U�^��`��ˊc      �      x�3�4�2�4�2�&��\�@v� '�       �   "   x�3�4�2��2�4�2�4�2�44������ ,y?      �   !   x�3�4�2�4�2�4�2�4�2�4����� '�      �   O   x�3�44�.)MI�K�N�2�4rS�2���9M9��s�+���L8M9��S�2�<SN��ԒԢD 'F���   �     