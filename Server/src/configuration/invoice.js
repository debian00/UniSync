const easyinvoice = require('easyinvoice');
const { User } = require("../database/db");

const generateInvoice = async (req, res) => {
  try {
    const { items } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ where: { id: id } });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const itemsBought = items.map((elem) => {
      return {
        item: elem.title,
        description: elem.book.author,
        quantity: elem.quantity,
        unitPrice: elem.price,
      };
    });

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const data = {
      documentTitle: 'Factura',
      currency: 'USD',
      taxNotation: 'GST',
      marginRight: 50,
      marginLeft: 50,
      marginTop: 25,
      marginBottom: 25,
      logo: 'https://www.example.com/logo.png',
      sender: {
        company: 'The-Next-Page-Library',
        address: 'Greed Island',
        zip: '12345',
        city: 'Ciudad del Pecado',
        country: 'Dubai',
      },
      client: {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber
      },
      invoiceNumber: '2023-001',
      invoiceDate: formattedDate,
      products: itemsBought,
      bottomNotice: 'Gracias por su compra.',
    };

    const result = easyinvoice.createInvoice(data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=factura.pdf');
    res.send(Buffer.from(result.pdf, 'base64'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar factura' });
  }
};

module.exports = generateInvoice;
