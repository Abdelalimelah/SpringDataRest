import React, { Component } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { useParams } from 'react-router-dom';

// Wrapper to inject URL params into class component
export default function VoitureWrapper(props) {
    const params = useParams();
    return <Voiture {...props} params={params} />;
}

class Voiture extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
    }

    initialState = {
        id: '',
        marque: '',
        modele: '',
        couleur: '',
        immatricule: '',
        prix: '',
        annee: ''
    }

    componentDidMount() {
        const { id } = this.props.params;
        if (id) {
            axios.get("http://localhost:8081/voitures/" + id)
                .then(response => {
                    const voiture = response.data;
                    this.setState({
                        id: voiture.id,
                        marque: voiture.marque,
                        modele: voiture.modele,
                        couleur: voiture.couleur,
                        immatricule: voiture.immatricule,
                        annee: voiture.annee,
                        prix: voiture.prix
                    });
                });
        }
    }

    resetVoiture = () => {
        this.setState(() => this.initialState);
    }

    voitureChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitVoiture(event) {
        event.preventDefault();
        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: this.state.annee,
            prix: this.state.prix
        };

        const { id } = this.props.params;

        if (id) {
            // UPDATE
            axios.put("http://localhost:8081/voitures/" + id, voiture)
                .then(response => {
                    if (response.data != null) {
                        this.setState({ show: true });
                        setTimeout(() => this.setState({ show: false }), 3000);
                    }
                });
        } else {
            // CREATE
            axios.post("http://localhost:8081/voitures", voiture)
                .then(response => {
                    if (response.data != null) {
                        this.setState(this.initialState);
                        this.setState({ show: true });
                        setTimeout(() => this.setState({ show: false }), 3000);
                    }
                });
        }
    }

    render() {
        const { marque, modele, couleur, immatricule, prix, annee } = this.state;
        const { id } = this.props.params;
        const isEdit = !!id;

        return (
            <div>
                <div style={{ display: this.state.show ? "block" : "none" }}>
                    <MyToast children={{
                        show: this.state.show,
                        message: isEdit ? "Voiture modifiée avec succès." : "Voiture enregistrée avec succès.",
                        type: "success"
                    }} />
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={isEdit ? faEdit : faPlusSquare} />
                        {isEdit ? " Modifier la Voiture" : " Ajouter une Voiture"}
                    </Card.Header>
                    <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
                        <Card.Body>
                            <Row>
                                <Form.Group as={Col} controlId="formGridMarque">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control required type="text" name="marque"
                                        value={marque} onChange={this.voitureChange}
                                        autoComplete="off"
                                        className="bg-dark text-white"
                                        placeholder="Entrez Marque Voiture" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridModele">
                                    <Form.Label>Modele</Form.Label>
                                    <Form.Control required type="text" name="modele"
                                        value={modele} onChange={this.voitureChange}
                                        autoComplete="off"
                                        className="bg-dark text-white"
                                        placeholder="Entrez Modele Voiture" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCouleur">
                                    <Form.Label>Couleur</Form.Label>
                                    <Form.Control required type="text" name="couleur"
                                        value={couleur} onChange={this.voitureChange}
                                        autoComplete="off"
                                        className="bg-dark text-white"
                                        placeholder="Entrez Couleur Voiture" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridImmatricule">
                                    <Form.Label>Immatricule</Form.Label>
                                    <Form.Control required type="text" name="immatricule"
                                        value={immatricule} onChange={this.voitureChange}
                                        autoComplete="off"
                                        className="bg-dark text-white"
                                        placeholder="Entrez Immatricule" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrix">
                                    <Form.Label>Prix</Form.Label>
                                    <Form.Control required type="text" name="prix"
                                        value={prix} onChange={this.voitureChange}
                                        autoComplete="off"
                                        className="bg-dark text-white"
                                        placeholder="Entrez Prix Voiture" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAnnee">
                                    <Form.Label>Annee</Form.Label>
                                    <Form.Control required type="text" name="annee"
                                        value={annee} onChange={this.voitureChange}
                                        autoComplete="off"
                                        className="bg-dark text-white"
                                        placeholder="Entrez Annee Voiture" />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{ textAlign: "right" }}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {isEdit ? "Modifier" : "Submit"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}
