-- Database Queries

-- Find all customers with postal code 1010

    12	Cactus Comidas para llevar	Patricio Simpson	Cerrito 333	Buenos Aires	1010	Argentina
    54	Océano Atlántico Ltda.	Yvonne Moncada	Ing. Gustavo Moncada 8585 Piso 20-A	Buenos Aires	1010	Argentina
    64	Rancho grande	Sergio Gutiérrez	Av. del Libertador 900	Buenos Aires	1010	Argentina


-- Find the phone number for the supplier with the id 11

    11	Heli Süßwaren GmbH & Co. KG	Petra Winkler	Tiergartenstraße 5	Berlin	10785	Germany	(010) 9984510

-- List first 10 orders placed, sorted descending by the order date

    10443	66	8	1997-02-12	1
    10442	20	3	1997-02-11	2
    10440	71	4	1997-02-10	2
    10441	55	3	1997-02-10	2
    10439	51	6	1997-02-07	3
    10438	79	3	1997-02-06	2
    10436	7	3	1997-02-05	2
    10437	87	8	1997-02-05	1
    10435	16	8	1997-02-04	2
    10433	60	3	1997-02-03	3

-- Find all customers that live in London, Madrid, or Brazil

    15	Comércio Mineiro	Pedro Afonso	Av. dos Lusíadas, 23	São Paulo	05432-043	Brazil
    21	Familia Arquibaldo	Aria Cruz	Rua Orós, 92	São Paulo	05442-030	Brazil
    31	Gourmet Lanchonetes	André Fonseca	Av. Brasil, 442	Campinas	04876-786	Brazil
    34	Hanari Carnes	Mario Pontes	Rua do Paço, 67	Rio de Janeiro	05454-876	Brazil
    61	Que Delícia	Bernardo Batista	Rua da Panificadora, 12	Rio de Janeiro	02389-673	Brazil
    62	Queen Cozinha	Lúcia Carvalho	Alameda dos Canàrios, 891	São Paulo	05487-020	Brazil
    67	Ricardo Adocicados	Janete Limeira	Av. Copacabana, 267	Rio de Janeiro	02389-890	Brazil
    81	Tradição Hipermercados	Anabela Domingues	Av. Inês de Castro, 414	São Paulo	05634-030	Brazil
    88	Wellington Importadora	Paula Parente	Rua do Mercado, 12	Resende	08737-363	Brazil

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

    92	The Shire	Bilbo Baggins	1 Hobbit-Hole	"Bag End"	111	Middle Earth

-- Update Bilbo Baggins record so that the postal code changes to "11122"

    92	The Shire	Bilbo Baggins	1 Hobbit-Hole	"Bag End"	11122	Middle Earth

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
