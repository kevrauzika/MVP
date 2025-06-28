"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, User, FileText } from "lucide-react"

interface CheckoutFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export default function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    // Dados do Condutor
    driverName: "",
    driverEmail: "",
    driverPhone: "",
    driverCPF: "",
    driverBirthDate: "",
    driverLicense: "",
    driverLicenseExpiry: "",

    // Método de Pagamento
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",

    // Termos
    acceptTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validações básicas
    if (!formData.driverName.trim()) newErrors.driverName = "Nome é obrigatório"
    if (!formData.driverEmail.trim()) newErrors.driverEmail = "E-mail é obrigatório"
    if (!formData.driverPhone.trim()) newErrors.driverPhone = "Telefone é obrigatório"
    if (!formData.driverCPF.trim()) newErrors.driverCPF = "CPF é obrigatório"
    if (!formData.driverBirthDate) newErrors.driverBirthDate = "Data de nascimento é obrigatória"
    if (!formData.driverLicense.trim()) newErrors.driverLicense = "CNH é obrigatória"
    if (!formData.driverLicenseExpiry) newErrors.driverLicenseExpiry = "Validade da CNH é obrigatória"

    // Validações de pagamento
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Número do cartão é obrigatório"
      if (!formData.cardName.trim()) newErrors.cardName = "Nome no cartão é obrigatório"
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Validade é obrigatória"
      if (!formData.cardCVV.trim()) newErrors.cardCVV = "CVV é obrigatório"
    }

    if (!formData.acceptTerms) newErrors.acceptTerms = "Você deve aceitar os termos"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")
  }

  return (
    <div className="space-y-8">
      {/* Dados do Condutor */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <User className="w-6 h-6 mr-2 text-orange-600" />
          Dados do Condutor Principal
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label>
              <input
                type="text"
                value={formData.driverName}
                onChange={(e) => handleInputChange("driverName", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.driverName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Digite seu nome completo"
              />
              {errors.driverName && <p className="text-red-500 text-sm mt-1">{errors.driverName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail *</label>
              <input
                type="email"
                value={formData.driverEmail}
                onChange={(e) => handleInputChange("driverEmail", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.driverEmail ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="seu@email.com"
              />
              {errors.driverEmail && <p className="text-red-500 text-sm mt-1">{errors.driverEmail}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone *</label>
              <input
                type="tel"
                value={formData.driverPhone}
                onChange={(e) => handleInputChange("driverPhone", formatPhone(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.driverPhone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="(11) 99999-9999"
                maxLength={15}
              />
              {errors.driverPhone && <p className="text-red-500 text-sm mt-1">{errors.driverPhone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">CPF *</label>
              <input
                type="text"
                value={formData.driverCPF}
                onChange={(e) => handleInputChange("driverCPF", formatCPF(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.driverCPF ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="000.000.000-00"
                maxLength={14}
              />
              {errors.driverCPF && <p className="text-red-500 text-sm mt-1">{errors.driverCPF}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Data de Nascimento *</label>
              <input
                type="date"
                value={formData.driverBirthDate}
                onChange={(e) => handleInputChange("driverBirthDate", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.driverBirthDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.driverBirthDate && <p className="text-red-500 text-sm mt-1">{errors.driverBirthDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Número da CNH *</label>
              <input
                type="text"
                value={formData.driverLicense}
                onChange={(e) => handleInputChange("driverLicense", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.driverLicense ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="12345678901"
              />
              {errors.driverLicense && <p className="text-red-500 text-sm mt-1">{errors.driverLicense}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Validade da CNH *</label>
              <input
                type="date"
                value={formData.driverLicenseExpiry}
                onChange={(e) => handleInputChange("driverLicenseExpiry", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.driverLicenseExpiry ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.driverLicenseExpiry && <p className="text-red-500 text-sm mt-1">{errors.driverLicenseExpiry}</p>}
            </div>
          </div>
        </form>
      </div>

      {/* Método de Pagamento */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <CreditCard className="w-6 h-6 mr-2 text-orange-600" />
          Método de Pagamento
        </h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={formData.paymentMethod === "credit-card"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              />
              <span className="ml-2 text-gray-700">Cartão de Crédito</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="pix"
                checked={formData.paymentMethod === "pix"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              />
              <span className="ml-2 text-gray-700">PIX</span>
            </label>
          </div>

          {formData.paymentMethod === "credit-card" && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Número do Cartão *</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome no Cartão *</label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value.toUpperCase())}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.cardName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="NOME COMO NO CARTÃO"
                />
                {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Validade *</label>
                  <input
                    type="text"
                    value={formData.cardExpiry}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      const formatted = value.replace(/(\d{2})(\d{2})/, "$1/$2")
                      handleInputChange("cardExpiry", formatted)
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.cardExpiry ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                  <input
                    type="text"
                    value={formData.cardCVV}
                    onChange={(e) => handleInputChange("cardCVV", e.target.value.replace(/\D/g, ""))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.cardCVV ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cardCVV && <p className="text-red-500 text-sm mt-1">{errors.cardCVV}</p>}
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === "pix" && (
            <div className="pt-4 border-t">
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Após confirmar a reserva, você receberá o código PIX para pagamento. O pagamento deve ser realizado em
                  até 30 minutos.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Termos e Condições */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-orange-600" />
          Termos e Condições
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-4">
              Ao prosseguir com a reserva, você concorda com nossos termos de aluguel, incluindo políticas de
              cancelamento, responsabilidades do condutor e condições de uso do veículo.
            </p>
            <a href="#" className="text-orange-600 hover:text-orange-700 text-sm underline">
              Ler termos completos
            </a>
          </div>

          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
              className={`w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1 ${
                errors.acceptTerms ? "border-red-500" : ""
              }`}
            />
            <span className="ml-2 text-sm text-gray-700">Eu li e aceito os termos e condições de aluguel *</span>
          </label>
          {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
        </div>
      </div>

      {/* Botão de Finalizar */}
      <div className="text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Processando...
            </div>
          ) : (
            "Finalizar Pedido"
          )}
        </button>
      </div>
    </div>
  )
}
