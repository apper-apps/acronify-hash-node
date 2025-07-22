import mockData from "@/services/mockData/acronyms.json"

class AcronymService {
  constructor() {
    this.storageKey = "acronify_data"
    this.data = this.loadFromStorage()
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        return JSON.parse(stored)
      }
      // Initialize with mock data if no stored data
      this.saveToStorage(mockData)
      return [...mockData]
    } catch (error) {
      console.warn("Failed to load from localStorage:", error)
      return [...mockData]
    }
  }

  saveToStorage(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.warn("Failed to save to localStorage:", error)
    }
  }

  async getAll() {
    await this.simulateDelay()
    return [...this.data]
  }

  async getById(id) {
    await this.simulateDelay()
    const item = this.data.find(item => item.Id === parseInt(id))
    if (!item) {
      throw new Error(`Acronym with Id ${id} not found`)
    }
    return { ...item }
  }

  async create(item) {
    await this.simulateDelay()
    
    const maxId = this.data.length > 0 
      ? Math.max(...this.data.map(item => item.Id))
      : 0
    
    const newItem = {
      ...item,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    }
    
    this.data.unshift(newItem)
    this.saveToStorage(this.data)
    return { ...newItem }
  }

  async update(id, data) {
    await this.simulateDelay()
    
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Acronym with Id ${id} not found`)
    }
    
    const updatedItem = { ...this.data[index], ...data, Id: parseInt(id) }
    this.data[index] = updatedItem
    this.saveToStorage(this.data)
    return { ...updatedItem }
  }

  async delete(id) {
    await this.simulateDelay()
    
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Acronym with Id ${id} not found`)
    }
    
    const deletedItem = this.data[index]
    this.data.splice(index, 1)
    this.saveToStorage(this.data)
    return { ...deletedItem }
  }

  async simulateDelay() {
    const delay = Math.random() * 300 + 200 // 200-500ms
    return new Promise(resolve => setTimeout(resolve, delay))
  }
}

export const acronymService = new AcronymService()