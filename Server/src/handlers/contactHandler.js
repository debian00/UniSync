const {Contact} = require('../database/db')

const getAllContacts = async (req, res) => {
    try {
      // Obtén todos los contactos de la base de datos
      const contacts = await Contact.findAll();
  
      // Envía los datos de los contactos en la respuesta
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los contactos' });
    }
};

const createContact = async (req, res) => {
    const { name, lastname, email, phone, message } = req.body;
    
    try {
      // Crea un nuevo registro en la tabla "Contact"
      const newContact = await Contact.create({
        name,
        lastname,
        email,
        phone,
        message,
      });
  
      res.status(201).json({
        message: 'Mensaje creado con éxito',
        contact: newContact,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el mensaje' });
    }
};
const deleteContact = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Elimina el registro en la tabla "Contact" con el ID proporcionado
      const deletedContact = await Contact.destroy({
        where: { id },
      });
  
      if (deletedContact) {
        res.status(200).json({ message: 'Eliminado con éxito' });
      } else {
        res.status(404).json({ message: 'Contacto no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el contacto' });
    }
  };

module.exports = {
    createContact,
    deleteContact,
    getAllContacts
}